<script setup lang="ts">
import { defineProps } from 'vue'

//親コンポーネントからタイトルを受け取る
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <header class="app-header">
    <div class="left">
      <h1 class="app-title">rucQ</h1>
    </div>
    <div class="center">
      <h1 class="page-title">{{ props.title }}</h1>
    </div>
  </header>
</template>


<style scoped>
.app-header {
  display: flex;
  justify-content: flex-start; /* 左寄せ */
  align-items: center;
  background-color: #333; /* ヘッダーの背景色 */
  color: white; /* 文字色 */
  padding: 10px 20px; /* 上下左右の余白 */
  z-index: 100000; /* 他の要素より手前に表示 */
}

.left {
  display: flex;
  align-items: center;
}

.center {
  flex-grow: 1; /* 中央のタイトルが残りのスペースを占める */
  text-align: center;
}

.app-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.page-title {
  font-size: 20px;
  font-weight: normal;
  margin: 0;
}
</style>

