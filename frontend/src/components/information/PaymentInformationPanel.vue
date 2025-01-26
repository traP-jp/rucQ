<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBudget } from '@/api/handler'


import createClient from 'openapi-fetch'
import type { paths } from '@/api/schema'

const billing = ref('')
const iconUrl = ref('')

onMounted(async () => {
  try {
    const response = await getBudget()
    console.log('API response:', response)
    billing.value = response.amount
  } catch (error) {
    console.error('Failed to fetch budget:', error)
  }
  try {
    const client = createClient<paths>({ baseUrl: 'https://rucq.trap.show/api' })

    const { data, error } = await client.GET('/api/me')
    const traqId = data!.traq_id
    iconUrl.value = `https://q.trap.jp/api/v3/public/icon/${traqId}`
  } catch (error) {
    console.error('Failed to fetch user information:', error)
  }
})
</script>

<template>
  <v-card class="bg-red-lighten-4 text-red-accent-3 pa-4">
    <v-card-title class="text-center text-h4 pa-0">
      <v-avatar :size="64">
        <v-img :src="iconUrl" />
      </v-avatar>
      ¥{{ billing }}
    </v-card-title>
    <v-card-text class="text-center pa-0">支払いが完了していません</v-card-text>
  </v-card>
</template>
