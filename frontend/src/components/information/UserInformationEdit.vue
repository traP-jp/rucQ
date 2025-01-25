<script setup lang="ts">
type QuestionItem = Question & { content: string | string[], displayContent: string }

const props = defineProps<{ questionItem: QuestionItem }>()
const answer = defineModel<string | string[]>()

const hint = `${props.questionItem.description ?? ''}${props.questionItem.is_public ? '' : ' (private)'}`
const selectionItems = props.questionItem.options?.map((option) => option.content) ?? []
</script>

<template>
  <v-text-field
    v-if="questionItem.type === 'free_text'"
    v-model="answer"
    :disabled="!questionItem.is_open"
    :label="questionItem.title"
    :hint="hint"
    persistent-hint
  />

  <v-text-field
    v-if="questionItem.type === 'free_number'"
    v-model="answer"
    :disabled="!questionItem.is_open"
    :label="questionItem.title"
    :hint="hint"
    persistent-hint
  />

  <v-select
    v-if="questionItem.type === 'single'"
    v-model="(answer as string)"
    :disabled="!questionItem.is_open"
    :label="questionItem.title"
    :items="selectionItems"
    :hint="hint"
    persistent-hint
  />

  <v-select
    v-if="questionItem.type === 'multiple'"
    v-model="(answer as string[])"
    :disabled="!questionItem.is_open"
    :label="questionItem.title"
    :items="selectionItems"
    :hint="hint"
    persistent-hint
    multiple
  />
</template>
