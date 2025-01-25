<script setup lang="ts">
import type { components } from '@/api/schema'

import createClient from 'openapi-fetch'
import type { paths } from '@/api/schema'
const client = createClient<paths>({ baseUrl: "http://localhost:8080" })
const {
  data,
  error,
} = await client.GET('/api/questions')

const props = defineProps<{
  question: components["schemas"]["Question"]
}>()

const validateNumber = (value: string) => {
  return value === 'OK' || value === '' || 'Error Message'
}
</script>

<template>
  <div v-if="true" class="d-flex">
    <v-text-field
      :disabled="false"
      :label="'アレルギー'"
      :hint="'12/27まで 食物アレルギー等'"
      persistent-hint
      density="comfortable"
    />
    <div class="d-flex flex-column align-center">
      なし
      <v-checkbox-btn class="flex-grow-0" />
    </div>
  </div>

  <v-text-field
    v-if="true"
    label="身長"
    :hint="'1/5まで 単位はcm'"
    persistent-hint
    density="comfortable"
    :rules="[validateNumber]"
  />

  <v-select
    label="スキー"
    :items="['する', 'しない']"
    :hint="'1/5まで する場合はレンタル調査にも回答してください'"
    persistent-hint
    density="comfortable"
    clearable
  />
</template>
