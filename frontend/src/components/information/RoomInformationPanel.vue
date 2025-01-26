<script setup lang="ts">
import createClient from 'openapi-fetch'
import type { paths } from '@/api/schema'

const client = createClient<paths>({ baseUrl: 'https://rucq.trap.show/api' })

const { data, error } = await client.GET('/api/me')
const traqId = data!.traq_id
const iconUrl = `https://q.trap.jp/api/v3/public/icon/${traqId}`
</script>

<template>
  <v-card class="bg-orange-lighten-4 text-orange-accent-4 pa-4">
    <v-card-title class="text-center text-h4 pa-0">201</v-card-title>
    <v-container class="d-flex justify-center pa-0">
      <v-avatar v-for="i in 5" :key="i" :size="32">
        <v-img :src="iconUrl" />
      </v-avatar>
    </v-container>
  </v-card>
</template>
