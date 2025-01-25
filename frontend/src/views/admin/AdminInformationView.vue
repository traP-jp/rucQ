<template>
  <div :class="$style.header">User Data</div>

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
          <td :class="$style.nameCell" @click="goToDetail(item.id)">{{ item.name }}</td>
          <td :class="$style.deadline">{{ item.deadline }}</td>
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
            v-model="newItem.name"
            :class="$style.textField"
            variant="outlined"
            rows="1"
            auto-grow
          />
          <v-textarea
            label="説明"
            v-model="newItem.description"
            :class="$style.textField"
            variant="outlined"
            rows="2"
            auto-grow
          />
          <v-textarea
            label="回答期限"
            v-model="newItem.deadline"
            variant="outlined"
            rows="1"
            auto-grow
            :class="$style.textField"
          />

          <div :class="$style.selectAnswerStyle">
            <v-select
              label="回答形式"
              :items="['text', 'checkbox', 'radiobutton']"
              v-model="newItem.type"
              :class="$style.textField"
              variant="outlined"
            />
            <div v-if="newItem.type === 'checkbox' || newItem.type === 'radiobutton'">
              <v-text-field
                v-model="newOption[newOption.length - 1]"
                label="選択肢名"
                :class="$style.textField"
              />
              <v-btn @click="addOption">選択肢を追加</v-btn>
              <div
                v-for="(option, index) in newItem.options"
                :key="index"
                :class="$style.addedOption"
              >
                {{ option }}
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dialog = ref(false)
interface Item {
  name: string
  description: string
  deadline: string
  type: string
  options: string[]
}

const newItem = ref<Item>({
  name: 'aaaaa',
  description: '',
  deadline: '2023-11-23',
  type: 'text',
  options: [],
})
const newOption = ref<string>('')
const newOptions = ref<string[]>([])

const goToDetail = (id: number) => {
  // クリック時に詳細ページに移動
  router.push({ name: 'DetailPage', params: { id } })
}

const items = ref([
  { id: 1, type: 'event', name: 'スキーに行きますか', deadline: '2023-12-01' },
  { id: 2, type: 'event', name: 'スキーで何を借りますか', deadline: '2023-12-15' },
  { id: 3, type: 'event', name: '何か質問', deadline: '期限切れ' },
  { id: 4, type: 'room', name: '部屋割りについて', capacity: 20 },
  { id: 4, type: 'room', name: '予算について', capacity: 20 },
  { id: 4, type: 'room', name: 'お風呂の時間について', capacity: 20 },
  // ...他の項目
])

const expiredEventsCount = computed(() => {
  return items.value.filter((item) => item.type === 'event' && item.deadline === '期限切れ').length
})

const addItem = () => {
  dialog.value = true
}

// checkbox, radiobutton のオプションを追加するメソッド
const addOption = () => {
  if (newOption.value.trim()) {
    newItem.value.options.push(newOption.value)
    newOption.value = ''
  }
}

const dialogClose = () => {
  dialog.value = false
  newItem.value = { name: '', deadline: '', description: '', type: 'text', options: [] }
  newOption.value = ''
}

const decideAddItem = () => {
  // 2024-12-01のような形式かどうかの確認
  if (newItem.value.deadline.match(/^\d{4}-\d{2}-\d{2}$/)) {
    // questionHeader.value.deadline = newItem.value.deadline
  } else {
    alert('日付の形式が正しくありません (yyyy-mm-dd)')
    return
  }

  dialogClose()
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
}

.nameCell:hover {
  color: #000000;
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
  width: 50%;
  min-width: 300px;
  margin: auto;
  max-height: 80vh;
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
}

.addedOption {
  margin-top: 10px;
}

.selectAnswerStyle {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 80px;
}
</style>
