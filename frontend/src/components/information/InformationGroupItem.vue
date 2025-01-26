<script setup lang="ts">
import { ref, computed } from 'vue'
import UserInformationEdit from '@/components/information/UserInformationEdit.vue'

type QuestionItem = Question & { content: string | string[]; displayContent: string }
const headers = [
  { text: 'label', value: 'title' },
  { text: 'answer', value: 'displayContent' },
]

const props = defineProps<{
  questionGroup: QuestionGroup
  staff?: boolean
}>()
const answers: QuestionAnswer[] = [
  {
    id: 353,
    question_id: 244,
    user_traq_id: 'ogu_kazemiya',
    content: 'する',
  },
  {
    id: 354,
    question_id: 245,
    user_traq_id: 'ogu_kazemiya',
    content: '998244353',
  },
  {
    id: 355,
    question_id: 246,
    user_traq_id: 'ogu_kazemiya',
    content: 'まんじゅう',
  },
]

const questionItems = ref<QuestionItem[]>(
  props.questionGroup.questions.map((question) => {
    const answer = answers.find((answer) => answer.question_id === question.id)
    const content = answer?.content ?? (question.type === 'multiple' ? [] : '')
    const display = Array.isArray(content) ? content.join(', ') : content
    return {
      ...question,
      content: content,
      displayContent: display,
    } as QuestionItem
  }),
)

const editMode = ref(false)

const isValid = computed(() => true)
</script>

<template>
  <v-card class="d-flex flex-column pa-4">
    <div class="d-flex flex-column">
      <div class="d-flex align-center justify-space-between">
        <v-card-title class="py-0">{{ questionGroup.name }}</v-card-title>
        <v-btn v-if="!editMode" icon variant="plain" size="small" @click="editMode = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
      <v-card-subtitle>{{ questionGroup.due }}まで</v-card-subtitle>
    </div>

    <v-data-table
      v-if="!editMode"
      class="pa-2"
      :headers="headers"
      :items="questionItems"
      density="compact"
      hide-default-header
      hide-default-footer
    />

    <v-form v-else class="d-flex flex-column ga-3 pa-2">
      <user-information-edit
        v-for="questionItem in questionItems"
        :key="questionItem.id"
        :question-item="questionItem"
        v-model="questionItem.content"
      />
      <v-btn :disabled="!isValid" type="submit">保存</v-btn>
    </v-form>
  </v-card>
</template>
