<template>
  <div class="container">
    <div class="headQuestionHeader">
      <div class="headQuestionTitle">
        {{ questionGroup?.name }}
        <button class="EditIconContainer" @click="openHeaderDialog">
          <v-icon class="edit-icon">mdi-square-edit-outline</v-icon>
        </button>

        <v-dialog v-model="dialog" scrollable>
          <v-sheet class="dialog-sheet">
            <h2>アンケートを編集</h2>
            <v-textarea
              label="アンケートタイトル"
              v-model="editedTitle"
              variant="outlined"
              rows="1"
              auto-grow
              class="text-field"
            />
            <v-textarea
              label="アンケート説明"
              v-model="editedDescription"
              variant="outlined"
              rows="3"
              auto-grow
              class="text-field"
            />
            <v-textarea
              label="回答期限"
              v-model="editedDeadline"
              variant="outlined"
              rows="1"
              auto-grow
              class="text-field"
            />
            <div class="dialogButtonContainer">
              <v-btn color="primary" @click="headerSave">保存</v-btn>
              <v-btn color="primary" variant="tonal" class="closeButton" @click="closeHeaderDialog"
                >キャンセル</v-btn
              >
            </div>
          </v-sheet>
        </v-dialog>
      </div>
      <div class="headQuestionDescription">{{ questionGroup?.description }}</div>
      <div class="headQuestionDeadline">回答期限: {{ questionGroup?.due }}</div>
    </div>

    <div class="questionsBody">
      <div v-for="question in questionGroup?.questions" :key="question.id">
        <div class="question">
          <div class="questionTitle">
            <div class="questionTitleText">{{ question.title }}</div>
            <div class="buttons">
              <div class="allCopyButton">全体をコピー</div>
              <button class="EditIconContainer" @click="openQuestionDialog(question.id)">
                <v-icon class="edit-icon">mdi-square-edit-outline</v-icon>
              </button>
            </div>
            <v-dialog v-model="questionDialogs[question.id]" scrollable>
              <v-sheet class="dialog-sheet">
                <h2>質問を編集</h2>
                <v-textarea
                  label="質問タイトル"
                  v-model="editedTitle"
                  variant="outlined"
                  rows="1"
                  auto-grow
                  class="text-field"
                />
                <v-textarea
                  label="質問説明"
                  v-model="editedDescription"
                  variant="outlined"
                  rows="3"
                  auto-grow
                  class="text-field"
                />
                <h2>選択肢</h2>
                <div
                  v-for="(option, index) in editedOptions"
                  :key="index"
                  class="editQuestionOption"
                >
                  <v-textarea
                    label="選択肢"
                    v-model="editedOptions[index].content"
                    variant="underlined"
                    rows="1"
                    auto-grow
                    class="text-field"
                  />
                </div>
                <v-btn
                  @click="editedOptions.push({ id: Date.now(), question_id: 0, content: '' })"
                  class="mb-5"
                  >選択肢を追加</v-btn
                >
                <div class="dialogButtonContainer">
                  <v-btn color="primary" @click="childQuestionSave(question.id)">保存</v-btn>
                  <v-btn
                    color="primary"
                    variant="tonal"
                    class="closeButton"
                    @click="childQuestionclose(question.id)"
                    >キャンセル</v-btn
                  >
                </div>
              </v-sheet>
            </v-dialog>
          </div>
          <div class="questionDescription">
            {{ question.description }}
          </div>

          <div v-for="option in question.options" :key="option.id">
            <div class="questionOption">
              {{ option.content }}

              <v-icon class="copyIcon">mdi-content-copy </v-icon>
            </div>
            <div class="questionRespondents">
              <!-- <span v-for="respondent in question.respondents" :key="respondent">
                <div class="member">{{ respondent }}</div>
              </span> -->
            </div>
          </div>
        </div>
      </div>
      <v-btn @click="" color="primary" class="w-25 ma-auto mb-3 mt-3">質問項目の追加</v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { apiClient } from '@/api/apiClient'
import type { components } from '@/api/schema'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dialog = ref(false)

// データ
const questionGroup = ref<components['schemas']['QuestionGroup']>()

// 編集用の一時変数
const editedTitle = ref()
const editedDescription = ref()
const editedDeadline = ref()
const editedOptions = ref<components['schemas']['Option'][]>([
  { id: 0, question_id: 0, content: '' },
])

onMounted(async () => {
  // パスパラメータを取得
  const eventIDParam = router.currentRoute.value.params.id
  const eventIDString: string = Array.isArray(eventIDParam) ? eventIDParam[0] : eventIDParam
  const eventID = Number(eventIDString)

  questionGroup.value = await getQuestionGroup(eventID)
  if (questionGroup.value === undefined) return

  questionGroup.value.due = formatISOToDate(questionGroup.value.due) // yyyy-mm-dd形式に変換

  questionGroup.value.questions.forEach((q) => {
    questionDialogs.value[q.id] = false
  })


  console.log(questionGroup.value)
})

const formatISOToDate = (isoString: string) => {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatDateToISO = (dateString: string) => {
  // formatがyyyy-mm-ddの形式になっていなければアラート
  const date = new Date(dateString)
  return date.toISOString()
}

// ダイアログを開くときに一時変数に現在の値をセット
const openHeaderDialog = () => {
  if (questionGroup.value === undefined) return

  editedTitle.value = questionGroup.value.name
  editedDescription.value = questionGroup.value.description
  editedDeadline.value = questionGroup.value.due
  dialog.value = true
}

const openQuestionDialog = (id: number) => {
  if (questionGroup.value === undefined) return

  // idが一致する質問を調べて取得
  const target: components['schemas']['Question'] | undefined = questionGroup.value.questions.find((q) => q.id === id)
  if (target === undefined) return

  editedTitle.value = target.title
  editedDescription.value = target.description
  editedOptions.value = target.options ? [...target.options] : []
  questionDialogs.value[id] = true
}

// ダイアログを閉じる際に一時変数をリセット
const closeHeaderDialog = () => {
  dialog.value = false
}

const childQuestionclose = (id: number) => {
  questionDialogs.value[id] = false
}

// 保存ボタンをクリックしたときの処理
const headerSave = () => {
  if (questionGroup.value === undefined) return

  questionGroup.value.name = editedTitle.value
  questionGroup.value.description = editedDescription.value

  // 2024-12-01のような形式かどうかの確認
  if (editedDeadline.value.match(/^\d{4}-\d{2}-\d{2}$/)) {
    questionGroup.value.due = editedDeadline.value
  } else {
    alert('日付の形式が正しくありません (yyyy-mm-dd)')
    return
  }
  dialog.value = false
}

const childQuestionSave = (id: number) => {
  // questions.value[id].title = editedTitle.value
  // questions.value[id].description = editedDescription.value
  // questions.value[id].options = editedOptions.value
  // questionDialogs.value[id] = false
}

const getQuestionGroup = async (id: number) => {
  const { data, error } = await apiClient.GET('/api/question_groups/{question_group_id}', {
    params: { path: { question_group_id: id } },
  })
  if (error) console.error('Failed to fetch question group:', error.message)
  return data
}

// それぞれの編集ボタンに対応するダイアログの表示状態を管理
const questionDialogs = ref<Record<number, boolean>>({})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fbfbfb;
}

.headQuestionHeader {
  padding: 16px;
  background-color: #fcfcfc;
  border-radius: 7px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 90%;
  position: relative;
  justify-content: center;
  margin-top: 40px;
}

.headQuestionTitle {
  border-bottom: 1px solid #e0e0e0;
  font-size: 20px;
  font-weight: bold;
  display: flex;
}

.headQuestionDescription {
  font-size: 15px;
  margin-top: 10px;
  color: #636363;
}

.headQuestionDeadline {
  font-size: 14px;
  margin-top: 8px;
  text-align: right;
  margin-right: 20px;
}

.questionsBody {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 90%;
  border-radius: 7px;
  margin-top: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.question {
  padding: 16px;
  background-color: #fcfcfc;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 7px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 95%;
  position: relative;
  justify-content: center;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
}

.questionTitleText {
  max-width: 80%;
}

.questionTitle {
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.questionOption {
  /*個々の質問の選択肢*/
  font-size: 16px;
  margin-top: 6px;
  color: #555555;

  display: flex;
  align-items: center;
}

.questionDescription {
  /*個々の質問の説明*/
  font-size: 17px;
  margin-top: 6px;
  padding-bottom: 10px;
  color: #2d2d2d;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
}

.questionRespondents {
  /*回答者の名前の枠*/
  font-size: 14px;
  color: #636363;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #bababa;
}

.member {
  /*回答者の名前*/
  background-color: #faece7;
  border-radius: 5px;
  padding: 1px;
  padding-right: 3px;
  padding-left: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
}

.dialog-sheet {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  min-width: 300px;
  margin: auto;
  max-height: 80vh;
}

.v-dialog__content {
  overflow: visible; /* 必要に応じて調整 */
}

.dialog-sheet h2 {
  margin-bottom: 25px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dialogButtonContainer {
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: 20px;
  gap: 20px;
  margin-bottom: 20px;
}

.editQuestionOption {
  /*個々の質問の選択肢*/
  width: 80%;
  display: flex;
  align-items: center;
}

.allCopyButton {
  /*全体をコピーするボタン*/
  background-color: #32da03;
  color: #ffffff;
  font-size: 20px;
  text-align: right;
  position: relative;
  margin-left: auto;
  font-size: 14px;
  margin-right: 10px;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
}

.text-field {
  resize: none;
  width: 80%;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: right;
  margin-left: auto;
}

/*クリック時のアニメーションは後でやる*/
.copyIcon {
  color: #ff9800;
  font-size: 16px;
  margin-left: auto;
  text-align: right;
  justify-content: center;
  cursor: pointer;
}

.edit-icon {
  color: #ff9800;
  font-size: 20px;
  margin-left: auto;
  text-align: right;
  justify-content: center;
  cursor: pointer;
}

.EditIconContainer {
  margin-left: auto;
  cursor: pointer;
}
</style>
