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
    :label="questionItem.title"
    :hint="hint"
    persistent-hint
  />

  <v-text-field
    v-if="questionItem.type === 'free_number'"
    v-model="answer"
    :disabled="disabled"
    :label="questionItem.title"
    :hint="hint"
    persistent-hint
  />

  <v-select
    v-if="questionItem.type === 'single'"
    v-model="answer"
    :disabled="disabled"
    :label="questionItem.title"
    :items="selectionItems"
    :hint="hint"
    persistent-hint
  />
</template>
