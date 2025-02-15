<script setup lang="ts">
defineProps<{ id?: string; size?: number }>()
import { useUserStore } from '@/store'
const userId = useUserStore().userId
</script>

<template>
  <img
    :style="`width: ${size}px; height: ${size}px; object-fit: contain; border-radius: ${(size || 0) / 2}px`"
    :src="`https://q.trap.jp/api/v3/public/icon/${id || userId}`"
  />
</template>
