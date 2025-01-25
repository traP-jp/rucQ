<script setup lang="ts">
import { ref } from 'vue'
import type { components } from '@/api/schema'

defineProps<{
  question: components["schemas"]["Question"]
}>()

const selectNo = ref('false')

const validateNumber = (value: string) => {
  return value === 'OK' || value === '' || '数値を入力してください'
}
</script>

<template>
  <div v-if="question.type === 'free_text'" class="d-flex">
    <v-text-field
      :disabled="!question.is_open"
      :label="question.title"
      :hint="question.description ?? ''"
      persistent-hint
      density="comfortable"
    />
    <div class="d-flex flex-column align-center">
      なし
      <v-checkbox-btn v-model="selectNo" class="flex-grow-0" />
    </div>
  </div>

  <v-text-field
    v-if="question.type === 'free_number'"
    :disabled="!question.is_open"
    :label="question.title"
    :hint="question.description ?? ''"
    persistent-hint
    density="comfortable"
    :rules="[validateNumber]"
  />

  <v-select
    v-if="question.type === 'single'"
    :disabled="!question.is_open"
    :label="question.title"
    :items="question.options ?? []"
    :hint="question.description ?? ''"
    persistent-hint
    density="comfortable"
    clearable
  />
</template>
