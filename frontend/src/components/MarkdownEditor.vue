<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { decorated } from '@/lib/editor-parse'
import ScrollableContent from './Generic/ScrollableContent.vue'
const isPreview = defineModel<boolean>('isPreview')
const text = defineModel<string>('text')

const isComposing = ref(false)
const textAll = ref('') // 変換中の部分を含めたテキスト全体
const cursorPos = ref(0) // カーソル位置
const textComposing = ref('')

const textarea = ref<HTMLTextAreaElement | undefined>(undefined)

const handleInput = () => {
  if (!textarea.value) {
    return
  }
  const prevCursorPos = textarea.value.selectionStart
  textAll.value = textarea.value.value
  text.value = textarea.value.value

  nextTick(() => {
    if (!textarea.value) {
      return
    }

    // defineModel の値は 1 フレーム待たないと変更されないらしい
    if (!isComposing.value) {
      text.value = textAll.value
    }
    textComposing.value = textAll.value.slice(
      cursorPos.value - (textAll.value.length - text.value!.length),
      cursorPos.value,
    )
    cursorPos.value = prevCursorPos
    textarea.value.setSelectionRange(cursorPos.value, cursorPos.value)
  })
}

watch(
  () => text.value,
  () => {
    if (text.value) {
      textAll.value = text.value
    }
  },
  { deep: true },
)

const handleCompose = () => {
  isComposing.value = false
  text.value = textAll.value
}

const enclose = (symbol: string) => {
  if (!textarea.value || !text.value) {
    return
  }
  textarea.value.focus()
  const start = textarea.value.selectionStart
  const end = textarea.value.selectionEnd
  console.log(start, end)
  let tempText = text.value // text.value は即座に変更されてくれないので
  tempText = tempText.slice(0, end) + symbol + tempText.slice(end, tempText.length)
  tempText = tempText.slice(0, start) + symbol + tempText.slice(start, tempText.length)
  text.value = tempText
  cursorPos.value = start === end ? end + symbol.length : end + 2 * symbol.length
  console.log(cursorPos.value)
  nextTick(() => {
    if (!textarea.value) {
      return
    }
    textarea.value.setSelectionRange(cursorPos.value, cursorPos.value)
  })
}

onMounted(() => {
  handleInput()
})

defineProps<{
  isPreviewable: boolean
}>()
</script>

<template>
  <div
    :class="$style.container"
    :style="`background: var(--color-theme-pale); color: var(--color-text)`"
  >
    <ScrollableContent>
      <div style="width: 26px"></div>
      <div :style="`border-left: 1px dashed var(--color-theme); padding-right: 6px`"></div>
      <div :class="$style.content">
        <textarea
          ref="textarea"
          :value="text"
          @input="handleInput"
          @compositionstart="isComposing = true"
          @compositionend="handleCompose"
          :class="$style.input"
        ></textarea>
        <div :class="$style.dummy">
          <div
            v-for="(line, i) in decorated(textAll, cursorPos, textComposing)"
            :key="i"
            :class="$style.dummyLine"
          >
            <div :class="$style.lineNumber">
              <p :class="$style.lineNumberText" :style="`color: var(--color-theme)`">
                {{ i + 1 }}
              </p>
            </div>
            <span
              v-for="(part, j) in line"
              :key="j"
              :class="$style.dummyLineText"
              :style="part.style"
            >
              {{ part.part }}
            </span>
          </div>
        </div>
      </div>
    </ScrollableContent>
    <div :class="$style.tools">
      <v-btn
        v-if="isPreviewable"
        @click="isPreview = true"
        density="comfortable"
        elevation="0"
        icon="mdi-eye-outline"
        baseColor="transparent"
        class="text-primary"
        style="margin-bottom: 10px"
      ></v-btn>
      <!-- <v-btn
          density="comfortable"
          elevation="0"
          icon="mdi-undo"
          baseColor="transparent"
          class="text-primary"
          :style="{ color: 'red' }"
        ></v-btn> -->
      <!-- document.execCommand('undo') が非推奨になっていて、自力実装の必要がありそうなので保留 -->
      <v-btn
        @click="enclose('**')"
        density="comfortable"
        elevation="0"
        icon="mdi-format-bold"
        baseColor="transparent"
      ></v-btn>
      <v-btn
        @click="enclose('*')"
        density="comfortable"
        elevation="0"
        icon="mdi-format-italic"
        baseColor="transparent"
      ></v-btn>
      <v-btn
        @click="enclose('~~')"
        density="comfortable"
        elevation="0"
        icon="mdi-format-strikethrough"
        baseColor="transparent"
      ></v-btn>
    </div>
  </div>
</template>

<style module>
.container {
  width: 100%;
  height: 100%;
  padding: 10px 0 10px 10px;
  font-family: 'M PLUS Code Latin 60', 'M PLUS 1p';
  font-weight: 400;
  display: flex;
}

.content {
  width: 100%;
  height: fit-content;
  min-height: max(100%, 100px);
  z-index: 1;
  position: relative;
}

.dummy {
  top: 0px;
  width: 100%;
  /* position: absolute; */
  font-family: 'M PLUS Code Latin 60', 'M PLUS 1p';
  white-space: pre-wrap;
  overflow-wrap: break-word;
  z-index: 0;
}

.dummyLine {
  position: relative;
  min-height: 1.4em;
  line-height: 1.4;
}

.lineNumber {
  position: absolute;
  left: -42px;
  width: 30px;
}

.lineNumberText {
  text-align: right;
}

.dummyLineText {
  position: relative;
}

.input {
  position: absolute;
  width: 100%;
  height: 100%;
  /* min-height: 1.4em; */
  resize: none;
  line-height: 1.4;
  overflow: hidden;
  z-index: 1;
  color: transparent;
  caret-color: black;
}

textarea::selection {
  text-decoration: none;
  -webkit-text-decoration: none;
  background-color: #ff000044;
}

.tools {
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 0 10px;
}
</style>
