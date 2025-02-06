<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { components } from '@/api/schema'
import { apiClient } from '@/api/apiClient'
import UserInformationEdit from '@/components/information/UserInformationEdit.vue'

type QuestionItem = components['schemas']['Question'] & {
  content?: string
  contentNew?: string
}
const headers = [
  { title: 'label', key: 'title' },
  { title: 'answer', key: 'content' },
]
const isValid = computed(() => true)

// targetIdは、undefined: 自分, null: 選択なし
const props = defineProps<{
  questionGroup: components['schemas']['QuestionGroup']
  targetId?: string | null
}>()

const questionItems = ref<QuestionItem[]>([])
const date = new Date(props.questionGroup.due)

const editMode = ref(false)

const constructQuestionItems = async () => {
  const res: QuestionItem[] = []
  for (const question of props.questionGroup.questions) {
    const answer = await getAnswer(question.id)
    res.push({
      ...question,
      content: answer?.content as string,
      contentNew: answer?.content as string,
    })
  }
  return res
}

const submit = async () => {
  let submitSuccess = true
  for (const questionItem of questionItems.value) {
    const putAnswerSuccess = await putAnswer(questionItem)
    if (!putAnswerSuccess) submitSuccess = false
  }
  if (submitSuccess) editMode.value = false
}

const cancel = () => {
  questionItems.value.forEach((questionItem) => {
    questionItem.contentNew = questionItem.content
  })
  editMode.value = false
}

const getAnswer = async (questionId: number) => {
  if (props.targetId === null) return null
  const { data, error } =
    props.targetId === undefined
      ? await apiClient.GET('/api/me/answers/{question_id}', {
          params: { path: { question_id: questionId } },
        })
      : await apiClient.GET('/api/users/{traq_id}/answers/{question_id}', {
          params: { path: { traq_id: props.targetId, question_id: questionId } },
        })
  if (error) console.error('Failed to fetch question answer:', error.message)
  return data
}

const putAnswer = async (questionItem: QuestionItem) => {
  if (props.targetId === null) return false
  const { error } =
    props.targetId === undefined
      ? await apiClient.PUT('/api/me/answers/{question_id}', {
          params: { path: { question_id: questionItem.id } },
          body: { content: questionItem.contentNew },
        })
      : await apiClient.PUT('/api/users/{traq_id}/answers/{question_id}', {
          params: { path: { traq_id: props.targetId, question_id: questionItem.id } },
          body: { content: questionItem.contentNew },
        })
  if (error) console.error('Failed to edit question answer:', error.message)
  else questionItem.content = questionItem.contentNew
  return error == null
}

onMounted(async () => {
  questionItems.value = await constructQuestionItems()
})
</script>

<template>
  <v-sheet class="d-flex flex-column rounded elevation-1 pa-4 ga-2">
    <div class="d-flex flex-column">
      <div class="d-flex align-center justify-space-between">
        <v-card-title class="py-0">{{ questionGroup.name }}</v-card-title>
        <v-btn
          v-if="!editMode"
          :disabled="targetId === null"
          icon
          variant="plain"
          size="small"
          @click="editMode = true"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-else icon variant="plain" size="small" @click="cancel">
          <v-icon>mdi-file-undo</v-icon>
        </v-btn>
      </div>
      <v-card-subtitle
        >{{ date.getMonth() + 1 }}/{{ date.getDate() }}まで
        {{ questionGroup.description }}</v-card-subtitle
      >
    </div>

    <v-data-table
      v-if="!editMode"
      class="px-4"
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
        :staff="targetId != null"
        v-model="questionItem.contentNew"
      />
      <v-btn :disabled="!isValid" type="submit" @click="submit">保存</v-btn>
    </v-form>
  </v-sheet>
</template>
