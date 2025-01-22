<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { marked } from 'marked'
import { useRouter, onBeforeRouteLeave } from 'vue-router'

// あとでvuetifyにします
import penIcon from '@/assets/penIcon.svg'
import penIconActive from '@/assets/penIconActive.svg'
import splitIcon from '@/assets/splitIcon.svg'
import splitIconActive from '@/assets/splitIconActive.svg'
import eyeIcon from '@/assets/eyeIcon.svg'
import eyeIconActive from '@/assets/eyeIconActive.svg'

const markdown = ref(`# 2024年度 夏合宿

## 概要
9/10(火)-9/12(木)
山中湖の[三盛荘](http://mitsumoriso.jp/)

## 注意事項
- **タオル、浴衣などのアメニティはありません。** 各自持参してください。
`)
const viewMode = ref('split')

const previewHtml = computed(() => marked(markdown.value))

const router = useRouter()

const isSaved = ref(true) /* 保存されたかどうかのフラグ 　未保存で消えちゃった、にならないように*/

const isMobile = ref(false)

const handleResize = () => {
  /*　画面幅によってviewModeを変更する　スマホモードの時にsplitいらない*/
  isMobile.value = window.innerWidth <= 768
  if (isMobile.value) {
    viewMode.value = 'edit'
  }
}

// 入力変更時に isSaved を false に設定する
const handleInputChange = () => {
  isSaved.value = false
}

// ルート離脱時に自動保存 するかは未定
onBeforeRouteLeave((to, from, next) => {
  if (!isSaved.value) {
    saveMarkdown()
    next()
  } else {
    next()
  }
})

// ウィンドウのリロードやタブを閉じる際に自動保存
const handleBeforeUnload = (event) => {
  if (!isSaved.value) {
    saveMarkdown()
    // 一部のブラウザでは以下の設定が必要　by gpt
    event.preventDefault()
    event.returnValue = ''
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

// ダミー保存関数　後でバックエンドと連携する
const saveMarkdown = () => {
  alert('保存しました！（バックエンド連携予定）')
  isSaved.value = true
  // navigator.sendBeacon　これを使うとアンロードされるときにリクエストの中断を避けれそう,少し問題もありそう
}

function showEditOnly() {
  viewMode.value = 'edit'
}
function showSplit() {
  viewMode.value = 'split'
}
function showPreviewOnly() {
  viewMode.value = 'preview'
}

// 保存関数（blurイベント用）　カーソルが離れたら保存する
const saveMarkdownAsync = async () => {
  isSaved.value = true // あとで書く
}

// blurイベントハンドラー
const handleBlur = () => {
  if (!isSaved.value) {
    saveMarkdownAsync()
  }
}
</script>

<template>
  <div class="admin-header">
    <div class="back-button"><</div>
    <h1>Guidebook Editor</h1>
  </div>

  <div class="admin-container">
    <div class="toolbar">
      <div class="editer-toolbar">
        <img
          :src="viewMode === 'edit' ? penIconActive : penIcon"
          alt="Pen Icon"
          @click="showEditOnly"
          :class="{ 'active-background': viewMode === 'edit' }"
        />
        <img
          v-if="!isMobile"
          :src="viewMode === 'split' ? splitIconActive : splitIcon"
          alt="Split Icon"
          @click="showSplit"
          :class="{ 'active-background': viewMode === 'split' }"
        />
        <img
          :src="viewMode === 'preview' ? eyeIconActive : eyeIcon"
          alt="Eye Icon"
          @click="showPreviewOnly"
          :class="{ 'active-background': viewMode === 'preview' }"
        />
      </div>
      <button class="save-button" @click="saveMarkdown">
        <img src="@/assets/saveIcon.svg" alt="Save Icon" />{{ isSaved ? '保存済み' : '未保存' }}
      </button>
    </div>
    <div class="editor-preview">
      <textarea
        v-if="viewMode === 'edit' || viewMode === 'split'"
        v-model="markdown"
        class="editor-area"
        @input="handleInputChange"
        @blur="handleBlur"
      ></textarea>
      <div class="center-bar" v-if="viewMode === 'split'"></div>
      <div
        class="preview-section"
        v-if="viewMode === 'preview' || viewMode === 'split'"
        v-html="previewHtml"
      ></div>
    </div>
  </div>
</template>

<style>
/* ヘッダー */
.admin-header {
  background-color: #ced3d9;
  color: #2a2639;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  font-size: 0.8rem;
}

.back-button {
  /*仮の戻るボタン　後で消す*/
  position: absolute;
  left: 1rem;
  cursor: pointer;
  font-size: 0.8rem;
}

/* コンテナ */
.admin-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow: hidden;
}

/* エディタとプレビュー */
.editor-preview {
  display: flex;
  padding: 0;
  margin: 0;
  padding-bottom: 0px;
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
}

.editor-area {
  flex: 1;
  font-family: 'Fira Code', monospace;
  caret-color: #146ad4; /* カーソルの色を白に変更 */
  min-height: 100%;
  background-color: #101620;
  color: #ccc;
  resize: none; /* サイズ変更を無効化 */
  outline: none; /* フォーカス時の枠線を消す */
  height: 100%;
  overflow-y: scroll;
}

.center-bar {
  width: 5px;
  background-color: #f8f8f8;
  box-shadow: 1px 0px 5px -2px #000;
  z-index: 10;
}

.preview-section {
  background-color: #f8f8f8;
  color: #101620;
  line-height: 1.8;
  flex: 1;
  margin: 0 auto; /* 中央揃え */
  padding-left: 30px;
  padding-right: 30px;
  height: 100%;
  overflow-y: scroll;
}

/* スクロールバーのカスタマイズ  　どこかにおいてもいいかも*/
.editor-area::-webkit-scrollbar,
.preview-section::-webkit-scrollbar {
  width: 3px;
}

.editor-area::-webkit-scrollbar-track .preview-section::-webkit-scrollbar-track {
  background: none;
  border-radius: 10px;
}
.preview-section::-webkit-scrollbar-thumb,
.editor-area::-webkit-scrollbar-thumb {
  border-radius: 10px;
  border: 2px solid #86858a;
}

.editor-area::-webkit-scrollbar-thumb:hover,
.preview-section::-webkit-scrollbar-thumb:hover {
  background-color: #ccc;
}

.toolbar {
  /*ヘッダーと同じ色にしたい*/
  background-color: #ced3d9;
  border-bottom: 1px solid #9fa0a7;
  position: relative;
  display: flex;
  font-style: column;
  text-align: center;
  padding: 0px;
  height: 40px;
  font-size: 0.9rem;
}

.editer-toolbar {
  display: flex;
  gap: 2px;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  margin: 0;
}

.editer-toolbar img {
  cursor: pointer;
  background-color: #a8acb1;
  border: 0.2px solid #8e9094;
  padding: 8px;
  margin: 0;
  border-radius: 6px;
  transition:
    background-color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}

.editer-toolbar img.active-background {
  background-color: #7a8289;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.editer-toolbar img.active-background:hover {
  background-color: #7a8289;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.editer-toolbar img:hover {
  background-color: #979ba0;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.toolbar img {
  cursor: pointer;
  padding: 3px;
  margin: 0;
}

/* 最終更新時刻 */
.last-updated {
  font-size: 0.9rem;
  color: #666;
}

/* 保存ボタン */
.save-button {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 2px;
  justify-content: center;
  text-align: center;
  align-items: center;
  background: none;
  color: #323145;
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
  padding: 0;
}

/* 以下　mdの表示設定　どこかにまとめてもいいかも */

.preview-section h1 {
  color: var(--color-secondary);
  margin-bottom: 24px;
  border-bottom: 1px solid #f7ae5a;
  padding-bottom: 8px;
}

.preview-section h2 {
  color: #092c57;
  border-bottom: 1px solid #f7ae5a;
  margin-top: 24px;
  margin-bottom: 16px;
}
.preview-section h3 {
  color: #092c57;
  line-height: 1;
  font-size: 1.2rem;
  margin-top: 24px;
  margin-bottom: 14px;
}

.preview-section a {
  color: #164fed;
  margin: 2px;
  overflow-wrap: break-word;
  padding: 0;
  line-height: 0.1px;
}

.preview-section a:hover {
  color: #0842e2;
}

.preview-section strong {
  background-color: none;
  /* 文字を太字にする */
  font-weight: bold;
  padding: 2px;
}
</style>
