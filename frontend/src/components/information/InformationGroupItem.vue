<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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

watch(
  () => props.targetId,
  async () => {
    questionItems.value = await constructQuestionItems()
  },
  { immediate: true },
)
</script>

<template>
  <v-sheet class="mb-4" :color="editMode ? 'orangePale' : 'white'">
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex flex-column">
        <v-card-title>
          <span style="font-size: 20px; font-weight: bold">{{ questionGroup.name }}</span>
        </v-card-title>
      </div>
      <v-btn
        v-if="!editMode"
        :disabled="targetId === null"
        icon
        variant="plain"
        size="small"
        @click="editMode = true"
        style="margin-right: 8px"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn v-else icon variant="plain" size="small" @click="cancel" style="margin-right: 8px">
        <v-icon>mdi-file-undo</v-icon>
      </v-btn>
    </div>
    <div
      v-if="editMode"
      style="padding: 0 16px; overflow-wrap: break-word; line-height: 1.4em; margin-bottom: 8px"
    >
      {{ questionGroup.description }}
    </div>
    <div style="padding-bottom: 8px">
      <div style="display: grid; grid-template-columns: 1fr 1fr">
        <div
          :style="`grid-row: 1 / ${questionItems.length + 1}; grid-column: 1; border-right: 1px solid var(--color-gray)`"
        ></div>
        <div
          v-for="(qItem, i) in questionItems"
          :key="qItem.id"
          :style="`align-self: ${editMode ? 'end' : 'center'}; grid-row: ${i + 1}; grid-column: 1; margin: 4px 16px;`"
        >
          {{ qItem.title }}
        </div>
        <div
          v-for="(qItem, i) in questionItems"
          :key="qItem.id"
          :style="`grid-row: ${i + 1}; grid-column: 2; margin: 4px 16px;`"
        >
          <span v-if="!editMode" style="font-weight: bold">
            {{ qItem.contentNew }}
          </span>
          <v-form v-else>
            <user-information-edit
              style="height: 10px !important; overflow: hidden"
              :key="qItem.id"
              :question-item="qItem"
              :staff="targetId != null"
              v-model="qItem.contentNew"
            />
          </v-form>
        </div>
      </div>
      <v-btn
        v-if="editMode"
        elevation="0"
        append-icon="mdi-check"
        :disabled="!isValid"
        variant="flat"
        color="orange"
        @click="submit"
        style="width: calc(100% - 32px); font-size: 16px; margin: 16px 16px 8px 16px"
        >保存</v-btn
      >
    </div>

    <!-- <v-data-table
      v-if="!editMode"
      class="px-4"
      :headers="headers"
      :items="questionItems"
      density="compact"
      hide-default-header
      hide-default-footer
    /> -->

    <!-- <v-form v-else class="d-flex flex-column ga-3 pa-2">
      <user-information-edit
        v-for="questionItem in questionItems"
        :key="questionItem.id"
        :question-item="questionItem"
        :staff="targetId != null"
        v-model="questionItem.contentNew"
      />
      <v-btn :disabled="!isValid" type="submit" @click="submit">保存</v-btn>
    </v-form> -->
  </v-sheet>
</template>
