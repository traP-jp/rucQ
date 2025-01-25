<script setup lang="ts">
import { ref } from 'vue'
import UserInformationEdit from '@/components/information/UserInformationEdit.vue'

const editMode = ref(false)

</script>

<template>
  <v-card class="d-flex flex-column ga-4 pa-4">
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
      :items="questionGroup.questions"
      density="compact"
      hide-default-header
      hide-default-footer
    />
    <!-- <ul v-else>
      <li v-for="question in questionGroup.questions" :key="question.id">
        <user-information-edit :question="question" />
      </li>
    </ul> -->

    <v-form v-else class="d-flex flex-column ga-2">
      <user-information-edit
        v-for="question in questionGroup.questions" :key="question.id"
        :question="question"
      />
      <v-btn type="submit">保存</v-btn>
    </v-form>
  </v-card>
</template>
