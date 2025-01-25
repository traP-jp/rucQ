<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute() // 現在のルート情報を取得
const title = ref<string>('') // ヘッダーに表示するタイトル

// URL に基づいてタイトルを設定する関数
const updateTitle = () => {
  const routeName = route.path.split('/').pop() || '' // ルート名が存在しない場合を考慮
  switch (routeName) {
    case 'guidebook':
      title.value = '合宿のしおり'
      break
    case 'schedule':
      title.value = 'スケジュール'
      break
    case 'notes':
      title.value = 'ノート'
      break
    case 'chat':
      title.value = 'チャット'
      break
    case 'info':
      title.value = '情報'
      break
    default:
      title.value = '合宿のしおり' // デフォルトでは空にする
  }
}

// ルートが変更されたときにタイトルを更新
watch(
  () => route.name,
  () => updateTitle(),
  { immediate: true } // 初回にも実行
)
</script>

<template>
  <header class="app-header">
    <img src="/logo/logo-white.svg" alt="rucQ Icon" class="logo" />
    <h2 class="page-title">{{ title }}</h2>
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

.logo{
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
