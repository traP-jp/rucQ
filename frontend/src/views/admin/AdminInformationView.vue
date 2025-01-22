<script setup lang="ts">
import { ref, onMounted } from 'vue'

const events = ref([
  { id: 1, name: 'Event 1', deadline: '2023-12-01' },
  { id: 2, name: 'Event 2', deadline: '2023-12-05' },
  { id: 3, name: 'Event 3', deadline: '2023-12-10' },
  { id: 4, name: 'Event 4', deadline: '2023-12-10' },
  { id: 5, name: 'Event 5', deadline: '2023-12-10' },
  { id: 6, name: 'Event 6', deadline: '2023-12-10' },
  { id: 7, name: 'Event 7', deadline: '2023-12-10' },
  { id: 8, name: 'Event 8', deadline: '2023-12-10' },
])
</script>

<template>
  <div :class="$style.header">user Data</div>

  <div :class="$style.allAnketo">
    <h1>イベント一覧</h1>
    <table :class="$style.eventTable">
      <thead>
        <tr>
          <th>質問名</th>
          <th>回答期限</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.name }}</td>
          <td>{{ event.deadline }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style module>
.header {
  background-color: #ced3d9;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.allAnketo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  margin: 30px;
  background-color: #dbdee1;
  color: black;
  border-radius: 10px;
}

.eventTable {
  width: 100%;
  max-width: 600px;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
}

.eventTable th, .eventTable td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.eventTable th {
  background-color: #f5f5f5;
}

.eventTable tr:nth-child(even) {
  background-color: #f9f9f9;
}

.eventTable th:first-child {
  border-top-left-radius: 10px;
}

.eventTable th:last-child {
  border-top-right-radius: 10px;
}

.eventTable td:first-child {
  border-bottom-left-radius: 10px;
}

.eventTable td:last-child {
  border-bottom-right-radius: 10px;
}

.eventTable th:nth-child(2), .eventTable td:nth-child(2) {
  width: 150px; /* 回答期限の列の幅を狭くする */
}
</style>