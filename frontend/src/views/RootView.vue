<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // 最新の合宿へリダイレクトする機能をあとで実装
  router.push({ path: '/camp24_summer' })
})
</script>

<template>
  <div></div>
</template>
