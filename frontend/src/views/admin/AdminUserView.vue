<script setup lang="ts">
import { ref } from 'vue'
import InformationGroupItem from '@/components/information/InformationGroupItem.vue'

const questionGroups: QuestionGroup[] = [
  {
    id: 998,
    name: '基本情報',
    description: 'ここに説明を追加',
    due: '12/27',
    questions: [
      {
        id: 244,
        question_group_id: 998,
        title: 'スキー',
        description: 'する場合はレンタル調査にも回答してください',
        type: 'single',
        is_public: true,
        is_open: true,
        options: [
          {
            id: 353,
            question_id: 244,
            content: 'する',
          },
          {
            id: 354,
            question_id: 244,
            content: 'しない',
          },
        ],
      },
      {
        id: 245,
        question_group_id: 998,
        title: '身長',
        description: '1cmきざみ',
        type: 'free_number',
        is_public: false,
        is_open: false,
      },
      {
        id: 246,
        question_group_id: 998,
        title: 'アレルギー',
        description: '食物アレルギー等',
        type: 'free_text',
        is_public: false,
        is_open: true,
      },
    ],
  },
]
const participants = ['ogu_kazemiya', 'mumumu', 'kitsne']

const traqId = ref('')
</script>

<template>
  <v-container class="d-flex flex-column ga-4">
    <v-autocomplete v-model="traqId" :items="participants" label="traQ ID" auto-select-first />
    <information-group-item
      v-for="questionGroup in questionGroups"
      :key="questionGroup.id"
      :questionGroup="questionGroup"
      :staff="true"
    />
  </v-container>
</template>
