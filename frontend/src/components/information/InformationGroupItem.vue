<script setup lang="ts">
import { ref } from 'vue'
import UserInformationEdit from './UserInformationEdit.vue'

import createClient from 'openapi-fetch'
import type { paths } from '@/api/schema'
const client = createClient<paths>({ baseUrl: "http://localhost:8080" })
const {
  data,
  error,
} = await client.GET('/api/questions')

const questions = data!

const editMode = ref(false)

const toggleEditMode = () => {
  if (editMode.value) {
    editMode.value = false
    // 編集内容を保存する
  } else {
    editMode.value = true
  }
}
</script>

<template>
  <v-card class="d-flex flex-column ga-4 pa-4">
    <div class="d-flex flex-column">
      <div class="d-flex align-center justify-space-between">
        <v-card-title class="py-0">基本情報</v-card-title>
        <v-btn icon variant="plain" size="small" @click="toggleEditMode">
          <v-icon v-if="editMode">mdi-content-save</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </div>
      <v-card-subtitle>12/27まで</v-card-subtitle>
    </div>
    <v-data-table
      v-if="!editMode"
      class="pa-2"
      :items="questions"
      density="compact"
      hide-default-header
      hide-default-footer
    />
    <ul v-else>
      <li v-for="question in questions" :key="question.id">
        <user-information-edit :question="question" />
      </li>
    </ul>
  </v-card>
</template>
