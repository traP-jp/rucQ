<template>
  <mobile-header v-if="xs" title="ユーザー情報閲覧" />

  <div :class="$style.allAnketo">
    <div :class="$style.anketoTitle">項目一覧</div>
    <table :class="$style.anketoTable">
      <thead>
        <tr :class="$style.tableHeader">
          <td :class="$style.typeColumn">内容</td>
          <td :class="$style.nameColumn">期限</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td :class="$style.nameCell" @click="goToDetail(item.id)">
            <span>{{ item.name }}</span>
          </td>
          <td :class="$style.deadline">{{ item.due }}</td>
        </tr>
      </tbody>
    </table>

    <!-- アクションボタン -->
    <div :class="$style.actions">
      <button @click="addItem">アンケートの追加</button>
      <v-dialog v-model="dialog">
        <v-sheet :class="$style.dialogSheet">
          <v-card-title>アンケートを追加</v-card-title>
          <v-textarea
            label="質問タイトル"
            v-model="newQuestionGroup.name"
            :class="$style.textField"
            variant="outlined"
            rows="1"
            auto-grow
          />
          <v-textarea
            label="説明"
            v-model="newQuestionGroup.description"
            :class="$style.textField"
            variant="outlined"
            rows="2"
            auto-grow
          />
          <v-textarea
            label="回答期限"
            v-model="newQuestionGroup.due"
            variant="outlined"
            rows="1"
            auto-grow
            :class="$style.textField"
          />

          <div :class="$style.selectAnswerStyle">
            <v-btn @click="addQuestionItem" color="primary" class="mt-4">質問項目の追加</v-btn>
            <div
              v-for="(question, index) in newQuestions"
              :key="index"
              :class="$style.questionCard"
            >
              <v-textarea
                label="説明"
                v-model="newQuestions[index].description"
                :class="$style.textField"
                variant="outlined"
                rows="1"
                auto-grow
              />
              <v-select
                label="回答形式"
                :items="['single', 'multiple', 'free_text', 'free_number']"
                v-model="newQuestions[index].type"
                :class="$style.textField"
                variant="outlined"
              />
              <div
                v-if="
                  newQuestions[index].type == 'single' || newQuestions[index].type == 'multiple'
                "
              >
                <v-btn @click="addOption(index)" :class="$style.addOptionButton"
                  >選択肢を追加</v-btn
                >
                <div
                  v-for="(option, optionId) in newOptions"
                  :key="optionId"
                  :class="$style.optionContainer"
                >
                  <div :class="$style.optionRow">
                    <v-textarea
                      label="選択肢名"
                      v-model="newOptions[optionId].content"
                      :class="$style.textOptionField"
                      variant="outlined"
                      rows="1"
                      hide-details
                      auto-grow
                    />

                    <!-- ここにバツボタン -->
                    <v-btn
                      @click="deleteOption(index, optionId)"
                      color="red-darken-1"
                      :class="$style.deleteButton"
                      >削除
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :class="$style.dialogButtonContainer">
            <v-btn @click="decideAddItem" color="primary">質問の追加</v-btn>

            <v-btn @click="dialogClose" color="primary" variant="tonal" :class="$style.closeButton"
              >キャンセル</v-btn
            >
          </div>
        </v-sheet>
      </v-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import MobileHeader from '@/components/layout/MobileHeader.vue'
import type { components } from '@/api/schema'
import { apiClient } from '@/api/apiClient'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()
const headerTitle = 'ユーザー情報閲覧'

const router = useRouter()
const dialog = ref(false)

const newQuestionGroup = ref<components['schemas']['PostQuestionGroupRequest']>({
  // 新規アンケートの追加
  camp_id: 0,
  name: '',
  due: '',
  description: '',
})

const newQuestions = ref<components['schemas']['PostQuestionRequest'][]>([
  {
    // 新規質問の追加
    question_group_id: 0,
    title: '',
    description: '',
    type: 'single',
    is_public: false,
    is_open: false,
  },
])

const newOptions = ref<(components['schemas']['PostOptionRequest'] & { id?: number })[]>([
  {
    // 新規選択肢の追加
    question_id: 0,
    content: '',
    id: 0,
  },
])

const deleteOption = (questionIndex: number, optionId: number) => {
  // 指定された位置の選択肢を削除
  newOptions.value.splice(optionId, 1)
  // 削除後、各要素のidを配列のインデックスに合わせて再設定
  newOptions.value.forEach((option, index) => {
    option.id = index
  })
}

const goToDetail = (id: number) => {
  // クリック時に詳細ページに移動
  router.push({ name: 'DetailPage', params: { id } })
}

const items = ref<components['schemas']['QuestionGroup'][]>([])

onMounted(async () => {
  items.value = await getQuestionGroups()
})

const addItem = () => {
  dialog.value = true
}
// addOption 関数内で存在チェックを追加
const addOption = (index: number) => {
  newOptions.value.push({
    id: newOptions.value.length,
    question_id: 0,
    content: '',
  })
}

// 新しい質問項目を追加するとき、Question の全必須プロパティを含めるようにします
const addQuestionItem = () => {
  newQuestions.value.push({
    title: '',
    description: '',
    type: 'single',
    is_public: false,
    is_open: false,
    question_group_id: 0,
  })
}

// dialogClose 内でも、プロパティ名が初期値と一致するように（due を使用）修正します
const dialogClose = () => {
  dialog.value = false
}

const decideAddItem = async () => {
  let campData = await getDefaultCamp()
  if(!campData) {
    console.error('Failed to fetch default camp')
    return
  }
  newQuestionGroup.value.camp_id = campData.id
  let res = await postQuestionGroup(newQuestionGroup.value)

  if (res) {
    newQuestions.value.forEach(async (question) => {
      question.question_group_id = res.id

      let questionRes = await postQuestion(question)
      if (questionRes) {
      newOptions.value.forEach(async (option) => {
        option.question_id = questionRes.id
        await apiClient.POST('/api/options', { body: option })
      })
    }
    })
  }
  dialogClose()
}

// apiに関する関数を追加
const getDefaultCamp = async () => {
  const { data, error } = await apiClient.GET('/api/camps/default')
  if (error) {
    console.error('Failed to fetch default camp:', error.message)
    return
  }
  return data
}

const getQuestionGroups = async () => {
  const { data, error } = await apiClient.GET('/api/question_groups')
  if (error) {
    console.error('Failed to fetch information groups:', error.message)
    return []
  }
  return data
}

const postQuestionGroup = async (
  questionGroup: components['schemas']['PostQuestionGroupRequest'],
) => {
  const { data, error } = await apiClient.POST('/api/question_groups', { body: {
    camp_id: questionGroup.camp_id,
    name: questionGroup.name,
    due: questionGroup.due,
    description: questionGroup.description,
  } })
  if (error) {
    console.error('Failed to post question group:', error.message)
    console.log(data)
    console.log(questionGroup.camp_id)
    return
  }


  return data
}

const postQuestion = async (question: components['schemas']['PostQuestionRequest']) => {
  const { data, error } = await apiClient.POST(`/api/questions`, { body: question })
  if (error) {
    console.error('Failed to put question:', error.message)
    return
  }
  return data
}

const postOption = async (option: components['schemas']['PostOptionRequest']) => {
  const { data, error } = await apiClient.POST(`/api/options`, { body: option })
  if (error) {
    console.error('Failed to put option:', error.message)
    return
  }
  return data
}
</script>

<style module>
.header {
  background-color: #4a90e2;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.allAnketo {
  margin: 30px auto;
  padding: 20px;
  width: 90%;
  background-color: rgb(248, 248, 248);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.anketoTitle {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.anketoTable {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border-spacing: 10px;
}

.tableHeader {
  border: 3px solid #948d8d !important;
  z-index: 2;
  background-color: #eaf3fa;
  font-size: 17px;
}

.questionCard {
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  width: 95%;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.typeColumn,/*内容　期限*/
.nameColumn {
  font-weight: bold;
  color: #333 !important;
  padding: 12px;
  border-bottom: none;
}

.deadline,
.nameCell {
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  font-size: larger;
  color: #333333;
}

.nameCell {
  cursor: pointer;
  transition: all ease-in 0.3s;
}

.nameCell span {
  border-bottom: 1px solid transparent; /* 初期状態は透明なボーダー */
  transition: border-bottom 0.1s ease-in; /* border-bottom のみにトランジションを適用 */
}

.nameCell span:hover {
  border-bottom: 1.5px solid #6b6666; /* ホバー時にボーダーを表示 */
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.actions button {
  padding: 10px 25px;
  background-color: #2a9d8f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.actions button:hover {
  background-color: #21867a;
}

.dialogSheet {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65%;
  min-width: 350px;
  margin: auto;
  max-height: 90vh;
}

.dialogButtonContainer {
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: 20px;
  gap: 20px;
  margin-bottom: 20px;
}

.textField {
  resize: none;
  width: 80%;
  margin: auto;
  justify-content: center;
  margin-top: 15px;
}

.textOptionField {
  resize: none;
  justify-content: center;
  text-align: center;
  margin: auto;
  width: 100%;
}

.addedOption {
  margin-top: 10px;
}

.selectAnswerStyle {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  gap: 20px;
  padding-bottom: 80px;
  margin-bottom: 20px;
  background-color: #fafafa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.addOptionButton {
  margin-top: 10px;
  margin-bottom: 20px !important;
  text-align: center;
  margin: 0 auto;
  display: block;
}

.optionContainer {
  margin-top: 10px;
  width: 80%;
  display: flex;
  margin: auto;
}

.optionRow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: auto;
  margin-bottom: 30px;
  width: 100%;
}

.deleteButton {
  margin: auto;
}
</style>
