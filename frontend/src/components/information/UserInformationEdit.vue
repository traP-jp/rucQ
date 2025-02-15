<script setup lang="ts">
import type { components } from '@/api/schema'

type QuestionItem = components['schemas']['Question'] & {
  content?: string
  contentNew?: string
}

const props = defineProps<{
  questionItem: QuestionItem
  staff: boolean
}>()
const answer = defineModel<string>()

const disabled = !(props.staff || props.questionItem.is_open)
const hint = `${props.questionItem.description ?? ''}${props.questionItem.is_public ? '' : ' (private)'}`
const selectionItems = props.questionItem.options?.map((option) => option.content) ?? []
</script>

<template>
  <v-text-field
    v-if="questionItem.type === 'free_text'"
    v-model="answer"
    :disabled="disabled"
    density="comfortable"
    hide-details="auto"
    variant="underlined"
  />

  <v-select
    v-if="questionItem.type === 'single'"
    v-model="answer"
    :disabled="disabled"
    :items="selectionItems"
    density="comfortable"
    hide-details="auto"
    hide-label="auto"
    variant="underlined"
  />
</template>
