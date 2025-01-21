<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'

const markdown = ref(`# 2024年度 夏合宿

## 概要
9/10(火)-9/12(木)
山中湖の[三盛荘](http://mitsumoriso.jp/)

## 注意事項
- **タオル、浴衣などのアメニティはありません。** 各自持参してください。
`)

const previewHtml = computed(() => marked(markdown.value))

// ダミー保存関数　後で消す
const saveMarkdown = () => {
  alert('保存しました！（バックエンド連携予定）')
}

// ツールバーのアクション
const insertMarkdown = (syntax: string) => {
  const textarea = document.querySelector<HTMLTextAreaElement>('.editor-area')
  if (textarea) {
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const before = text.substring(0, start)
    const after = text.substring(end)
    textarea.value = `${before}${syntax}${after}`
    markdown.value = textarea.value // 更新
    textarea.focus()
    textarea.setSelectionRange(start + syntax.length, start + syntax.length)
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
      <div class="last-updated">最終更新: 2023/09/01 19:30</div>
      <button class="save-button" @click="saveMarkdown">
        <img src="@/assets/saveIcon.svg" alt="Save Icon" />保存
      </button>
    </div>
    <!-- エディタとプレビュー -->
    <div class="editor-preview">
      <textarea v-model="markdown" class="editor-area"></textarea>
      <div class="center-bar" />
      <div class="preview-section" v-html="previewHtml"></div>
    </div>
    <!-- 保存ボタン -->
    <!-- フッターにボタンと最終更新時刻 -->
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

.editor-area::-webkit-scrollbar-thumb,
.preview-section::-webkit-scrollbar-thumb {
  border-radius: 10px;
  border: 2px solid #ffffff;
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
