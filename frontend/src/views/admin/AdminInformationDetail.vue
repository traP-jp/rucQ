<template>
  <div class="container">
    <div class="questionHeader">
      <div class="questionTitle">
        {{ questionHeader.title }}
        <v-icon class="edit-icon">mdi-square-edit-outline</v-icon>
      </div>
      <div class="questionDescription">{{ questionHeader.description }}</div>
      <div class="questionDeadline">回答期限: {{ questionHeader.deadline }}</div>
    </div>

    <div class="questionBody">
      <div v-for="question in questions" :key="question.id">
        <div class="questionTitle">{{ question.title }}</div>
        <div class="questionDescription">{{ question.description }}</div>
      
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const questionHeader = ref({
  title: '2024年度春合宿 レンタル調査',
  deadline: '2023-12-01',
  description:
    'スキー/スノボをする人は用具をレンタルできますので回答してください。本アンケートに回答しないと用具をレンタルできない可能性があります。',
})

type Question = {
  id: number
  title: string
  description: string
  type: 'text' | 'radio' | 'checkbox'
  options: string[]
}

const questions = ref<Question[]>([
  {
    id: 1,
    title: 'スキー/スノボをしますか？',
    description: 'スキー/スノボをする人は用具をレンタルできますので回答してください。',
    type: 'radio',
    options: ['スキー', 'スノボ', 'しない'],
  },
  {
    id: 2,
    title: 'スキー/スノボの用具をレンタルしますか？',
    description: 'スキー/スノボをする人は用具をレンタルできますので回答してください。',
    type: 'radio',
    options: ['レンタルする', '持参する'],
  },
  {
    id: 3,
    title: 'スキー/スノボの用具をレンタルする場合、サイズを教えてください。',
    description: 'スキー/スノボをする人は用具をレンタルできますので回答してください。',
    type: 'text',
    options: [],
  },
  {
    id: 4,
    title: "レンタルするもの",
    description: "レンタルするものを選択してください",
    type: 'checkbox',
    options: ['スキー板', 'スノボ板', 'ブーツ', 'ウェア', 'その他'],
  }
])


</script>

<style scoped>
.edit-icon {
  color: #ff9800;
  font-size: 24px;
  margin-left: auto;
  text-align: right;
  justify-content: center;
  cursor: pointer;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #fbfbfb;
}

.questionHeader {
  padding: 16px;
  background-color: #fcfcfc;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 90%;
  position: relative;
  justify-content: center;
  margin-top: 20px;
}

.questionTitle {
  font-size: 28px;
  font-weight: bold;
  display: flex;
}

.questionDescription {
  font-size: 18px;
  margin-top: 8px;
  color: #636363;
}

.questionDeadline {
  font-size: 14px;
  margin-top: 8px;
  text-align: right;
  margin-right: 20px;
}
</style>
