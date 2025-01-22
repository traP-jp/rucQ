<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
 <RouterView />
  <header class="app-header">
    <h1 class="app-title">rucQ</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: flex-start; /* 左寄せ */
  align-items: center;
  background-color: #333; /* ヘッダーの背景色 */
  color: white; /* 文字色 */
  padding: 10px 20px; /* 上下左右の余白 */
}

.app-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}
</style>

