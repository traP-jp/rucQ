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
</script>

<template>
  <v-card class="pa-4">
    <div class="d-flex align-center justify-space-between pa-0">
      <div class="d-flex align-end">
        <v-card-title class="py-0">基本情報</v-card-title>

        <v-card-subtitle class="pa-0">12/27まで</v-card-subtitle>
      </div>
      <v-btn icon="mdi:pencil" variant="plain" size="small" @click="editMode = !editMode" />
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
