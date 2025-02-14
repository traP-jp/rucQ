<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <img :src="`https://q.trap.jp/api/v3/public/icon/${id}`" />
</template>
