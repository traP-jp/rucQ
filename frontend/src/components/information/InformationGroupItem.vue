<script setup lang="ts">
import { ref } from 'vue'
import UserInformationEdit from './UserInformationEdit.vue'

const editMode = ref(false)

const items = [
  {
    label: '行きのバス',
    value: '乗る',
  },
  {
    label: '帰りのバス',
    value: '乗らない',
  },
  {
    label: 'アレルギー',
    value: 'まんじゅう',
  },
]

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
      :items="items"
      density="compact"
      hide-default-header
      hide-default-footer
    />
    <user-information-edit v-else />
  </v-card>
</template>
