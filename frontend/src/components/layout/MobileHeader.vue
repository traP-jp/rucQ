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
      <img src="/logo/logo-white.svg" alt="rucQ Icon" class="logo" />
    </div>
    <div class="center">
      <h1 class="page-title">{{ props.title }}</h1>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  background-color: var(--color-theme); /* ヘッダーの背景色 */
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
  margin-right: 20px; /* ロゴとタイトルの間隔を調整 */
}

.page-title {
  font-size: 20px;
  font-weight: normal;
  margin: 0;
}

.logo {
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
