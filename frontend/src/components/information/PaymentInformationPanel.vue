<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBudget } from '@/api/handler'

const billing = ref('')

onMounted(async () => {
  try {
    const response = await getBudget()
    console.log('API response:', response)
    billing.value = response.amount
  } catch (error) {
    console.error('Failed to fetch budget:', error)
  }
})
</script>

<template>
  <v-card class="bg-red-lighten-4 text-red-accent-3 pa-4">
    <v-card-title class="text-center text-h4 pa-0">¥{{billing}}</v-card-title>
    <v-card-text class="text-center pa-0">支払いが完了していません</v-card-text>
  </v-card>
</template>
