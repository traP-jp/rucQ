<template>
  <div :class="$style.detailContainer">
    <h1>詳細情報</h1>
    <p>項目ID: {{ id }}</p>
    <!-- 詳細情報の表示ロジックを追加 -->
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<style module>
.detailContainer {
  padding: 20px;
}
</style>
