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
      <button @click="addItem">項目追加</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDetail = (id: number) => {// クリック時に詳細ページに移動
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
  // 項目追加のロジック
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
  background-color: #f3f1f0;
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
  color: #000000
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
</style>
