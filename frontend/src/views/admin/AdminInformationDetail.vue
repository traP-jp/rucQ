<template>
  <div class="container">
    <div class="headQuestionHeader">
      <div class="headQuestionTitle">
        {{ questionHeader.title }}
        <v-icon class="edit-icon">mdi-square-edit-outline</v-icon>
      </div>
      <div class="headQuestionDescription">{{ questionHeader.description }}</div>
      <div class="headQuestionDeadline">回答期限: {{ questionHeader.deadline }}</div>
    </div>

    <div class="questionsBody">
      <div v-for="question in questions" :key="question.id">
        <div class="question">
          <div class="questionTitle">
            {{ question.title }}
            <div class="buttons">
              <div class="allCopyButton">
              <!-- <v-icon class="copyIcon">mdi-content-copy </v-icon> -->
              全体をコピー 
            </div>
            <v-icon class="edit-icon">mdi-square-edit-outline</v-icon>
            </div>
          </div>
          <div class="questionDescription">
            {{ question.description }}
          </div>

          <div v-for="option in question.options" :key="option">
           <div class="questionOption"> {{ option }} 
            <v-icon class="copyIcon">mdi-content-copy </v-icon>
           </div>
            <div class="questionRespondents">
              <span v-for="respondent in question.respondents" :key="respondent">
              <div class="member">  {{ respondent }} </div>
              </span>
            </div>
          </div>
        </div>
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
  answerCount: number
  respondents: string[]
}

const questions = ref<Question[]>([// まだ決まってないので一旦適当なダミーデータ、後でAPIから取得する。その時にここ頑張る
  {
    id: 1,
    title: 'スキー/スノボをしますか？',
    description: 'スキー/スノボをする人は用具をレンタルできますので回答してください。',
    type: 'radio',
    options: ['スキー', 'スノボ', 'しない'],
    answerCount: 12,
    respondents: ['山田', '田中', '鈴木', '佐藤', '高橋', '伊藤', '渡辺', '山本', '中村', '小林', '加藤', '吉田', '山口' , '松本', '井上', '木村','山田', '田中', '鈴木', '佐藤', '高橋', '伊藤', '渡辺', '山本', '中村', '小林', '加藤', '吉田', '山口' , '松本', '井上', '木村','山田', '田中', '鈴木', '佐藤', '高橋', '伊藤', '渡辺', '山本', '中村', '小林', '加藤', '吉田', '山口' , '松本', '井上', '木村','山田', '田中', '鈴木', '佐藤', '高橋', '伊藤', '渡辺', '山本', '中村', '小林', '加藤', '吉田', '山口' , '松本', '井上', '木村'],
  },
  {
    id: 2,
    title: 'スキー/スノボの用具をレンタルしますか？',
    description: 'スキー/スノボをする人は用具をレンタルできますので回答してください。',
    type: 'radio',
    options: ['レンタルする', '持参する'],
    answerCount: 8,
    respondents: ['佐藤', '鈴木'],
  },
  {
    id: 3,
    title: 'スキー/スノボの用具をレンタルする場合、サイズを教えてください。',
    description: 'スキー/スノボをする人は用具をレンタルできますので回答してください。',
    type: 'text',
    options: [],
    answerCount: 5,
    respondents: ['高橋', '伊藤'],
  },
  {
    id: 4,
    title: 'レンタルするもの',
    description: 'レンタルするものを選択してください',
    type: 'checkbox',
    options: ['スキー板', 'スノボ板', 'ブーツ', 'ウェア', 'その他'],
    answerCount: 10,
    respondents: ['渡辺', '山本'],
  },
])
</script>

<style scoped>


.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fbfbfb;
}

.headQuestionHeader {
  padding: 16px;
  background-color: #fcfcfc;
  border-radius: 7px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 90%;
  position: relative;
  justify-content: center;
  margin-top: 40px;
}

.headQuestionTitle {
  border-bottom: 1px solid #e0e0e0;
  font-size: 20px;
  font-weight: bold;
  display: flex;
}

.headQuestionDescription {
  font-size: 15px;
  margin-top: 10px;
  color: #636363;
}

.headQuestionDeadline {
  font-size: 14px;
  margin-top: 8px;
  text-align: right;
  margin-right: 20px;
}

.questionsBody {
  width: 90%;
  border-radius: 7px;
  margin-top: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.question {
  padding: 16px;
  background-color: #fcfcfc;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 7px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 95%;
  position: relative;
  justify-content: center;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
}

.questionTitle {
  font-size: 22px; 
  font-weight: bold;
  display: flex;
  align-items: center; 
}

.questionOption {
  font-size: 16px; 
  margin-top: 6px;
  color: #555555; 

  display: flex;
  align-items: center;
}

.questionDescription {
  font-size: 16px; 
  margin-top: 6px;
  padding-bottom: 10px; 
  color: #555555; 
  border-bottom: 1px solid #e0e0e0;
  display:flex;
}

.questionRespondents {
  font-size: 14px;
  color: #636363;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #bababa;
}

.member {
  background-color: #faece7;
  border-radius: 5px;
  padding: 1px;
  padding-right:3px;
  padding-left:3px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
}

.allCopyButton {
  background-color: #32da03;
  color: #ffffff;
  font-size: 20px;
  text-align:right;
  position:relative;
  margin-left:auto;
  font-size: 14px;
  margin-right:10px;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: right;
  margin-left: auto;
}


/*クリック時のアニメーションは後でやる*/
.copyIcon {
  color: #ff9800;
  font-size: 16px;
  margin-left: auto; 
  text-align: right;
  justify-content: center;
  cursor: pointer;
}

.edit-icon {
  color: #ff9800;
  font-size: 20px;
  margin-left: auto;
  text-align: right;
  justify-content: center;
  cursor: pointer;
}
</style>
