<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { markedHighlight } from 'marked-highlight'
import { Marked } from 'marked'
import hljs from 'highlight.js'

const text = defineModel<string>('text')

const html = computed(() => {
  const tempHtml = marked.parse(text.value || '') as string
  return tempHtml.replace('<pre><code>', '<pre><code class="hljs">')
  // <pre><code> のままでは表示がコードブロックの方式に従ってくれないので、末尾にクラス hljs を指定する
})

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      if (typeof lang === 'string' && lang.includes(':')) {
        lang = lang.substring(0, lang.indexOf(':'))
      }
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  }),
  {
    gfm: true, // GitHub Flavored Markdown を有効にする
    breaks: true, // 改行を有効にする（純正Markdownでは1段の改行がスペースに変換される決まりだが、それでは困るので）
  },
)

// node_modules フォルダの highlight.js から好きな配色を引っ張ってくる
// とはいえ個人のエディタではないので趣味はなしにしてとりあえず GitHub から
// 個人的には tokyo-night-dark がめっちゃ好き

import darkStyle from 'highlight.js/styles/github-dark.css?inline'
import lightStyle from 'highlight.js/styles/github.css?inline'

// ?inline をつけて読み込むことでCSSファイルもテキストデータになるらしい

onMounted(async () => {
  // あまりよくわかっていないGPT製のコード
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
  const highlightStyleTag = document.createElement('style')
  highlightStyleTag.textContent = prefersDarkScheme.matches ? darkStyle : lightStyle
  document.head.appendChild(highlightStyleTag)

  prefersDarkScheme.addEventListener('change', async (event) => {
    highlightStyleTag.textContent = event.matches ? darkStyle : lightStyle
  })
})
</script>

<template>
  <div v-html="html" style="padding: 10px"></div>
  <!-- {{ html }} と書くとそのまま HTML テキストが確認できる -->
</template>

<style scoped>
:deep(p) {
  font-size: 1em;
  line-height: 1.4;
  margin-bottom: 0.3lh;
}

:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6) {
  padding-top: 0.5em;
  font-weight: bold;
  letter-spacing: 0.05em;
}

:deep(strong) {
  font-weight: bold;
}

:deep(code) {
  font-family: 'M PLUS Code Latin 60', 'M PLUS 1p';
  font-weight: 500;
  font-size: 11pt;
}

:deep(pre code) {
  margin: 0 4px 8px 4px !important;
  border-radius: 6px;
  max-height: 400px;
  overflow: scroll;
  background-color: var(--color-darkgray) !important;
}

:deep(p code) {
  margin: 0 0px;
  background-color: var(--color-theme-pale);
  border-radius: 4px;
  border: 2px solid var(--color-theme-pale);
}

:deep(ul),
:deep(ol) {
  padding: 0px 0px 0px 20px;
  margin-top: 8px;
  margin-bottom: 8px;
}

:deep(li) {
  margin-bottom: 8px;
}

:deep(blockquote) {
  border-radius: 0px;
  color: var(--color-darkgray);
  padding: 0px 0px 0px 10px;
  border-left: 4px solid var(--color-lightgray);
  margin: 0 0 8px 4px;
}

:deep(tr:not(:last-child)) {
  border-bottom: 1px dashed var(--color-lightgray);
}

:deep(thead) {
  border-bottom: 1px solid var(--color-black);
}

:deep(th),
:deep(td) {
  padding: 4px;
}

:deep(th) {
  font-weight: bold;
}

:deep(table) {
  border-collapse: collapse;
}

:deep(a) {
  color: #0066ff !important;
  text-decoration: none;
}

:deep(a):hover {
  text-decoration: underline;
}
</style>
