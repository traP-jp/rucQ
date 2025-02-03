<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { components } from '@/api/schema'
import { getAnswer, editAnswer } from '@/api/handler'
import UserInformationEdit from '@/components/information/UserInformationEdit.vue'

type QuestionItem = components['schemas']['Question'] & {
  content: string
  contentNew: string
  displayContent: string
}
const headers = [
  { text: 'label', value: 'title' },
  { text: 'answer', value: 'displayContent' },
]

const props = defineProps<{
  questionGroup: components['schemas']['QuestionGroup']
  staff?: boolean
}>()
const answers = ref<QuestionAnswer[]>([])

const date = new Date(props.questionGroup.due)

const editMode = ref(false)
const isValid = computed(() => true)

const questionItems = ref<QuestionItem[]>(
  props.questionGroup.questions.map((question) => {
    const answer = answers.value.find((answer) => answer.question_id === question.id)
    const content = answer?.content ?? (question.type === 'multiple' ? [] : '')
    const display = Array.isArray(content) ? content.join(', ') : content
    return {
      ...question,
      content: content,
      contentNew: content,
      displayContent: display,
    } as QuestionItem
  }),
)

onMounted(async () => {
  for (const questionItem of questionItems.value) {
    try {
      const response = await getAnswer(questionItem.id)
      console.log('API response:', response)
      answers.value.push(response)
    } catch (error) {
      console.error('Failed to fetch question answer:', error)
    }
  }
})

const cancel = () => {
  questionItems.value.forEach((questionItem) => {
    questionItem.contentNew = questionItem.content
  })
  editMode.value = false
}

const submit = async () => {
  for (const questionItem of questionItems.value) {
    try {
      const response = await editAnswer(questionItem.id, questionItem.contentNew)
      console.log('API response:', response)
    } catch (error) {
      console.error('Failed to edit question answer:', error)
    }
  }
  editMode.value = false
}
</script>

<template>
  <v-card class="d-flex flex-column pa-4">
    <div class="d-flex flex-column">
      <div class="d-flex align-center justify-space-between">
        <v-card-title class="py-0">{{ questionGroup.name }}</v-card-title>
        <v-btn v-if="!editMode" icon variant="plain" size="small" @click="editMode = true">
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
        v-model="questionItem.contentNew"
      />
      <v-btn :disabled="!isValid" type="submit" @click="submit">保存</v-btn>
    </v-form>
  </v-card>
</template>
