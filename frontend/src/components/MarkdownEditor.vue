<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { decorated } from '@/lib/editor-parse'
const text = defineModel<string>('text')

const isComposing = ref(false)
const textAll = ref('') // 変換中の部分を含めたテキスト全体
const cursorPos = ref(0) // カーソル位置
const textComposing = ref('')

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  textAll.value = target.value
  text.value = target.value
  nextTick(() => {
    // defineModel の値は 1 フレーム待たないと変更されないらしい
    if (!isComposing.value) {
      text.value = textAll.value
    }
    cursorPos.value = target.selectionStart
    textComposing.value = textAll.value.slice(
      cursorPos.value - (textAll.value.length - text.value!.length),
      cursorPos.value,
    )
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

defineProps<{
  color: string
}>()
</script>

<template>
  <div
    :class="$style.container"
    :style="`background: var(--color-${color}-pale); color: var(--color-text)`"
  >
    <div :class="$style.guide">
      <div style="width: 26px"></div>
      <div :style="`border-left: 1px dashed var(--color-${color}); padding-right: 6px`"></div>
      <div :class="$style.content">
        <textarea
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
              <p :class="$style.lineNumberText" :style="`color: var(--color-${color})`">
                {{ i }}
              </p>
            </div>
            <div
              v-for="(part, j) in line"
              :key="j"
              :class="$style.dummyLineText"
              :style="part.style"
            >
              {{ part.part }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 10px;
  font-family: 'M PLUS Code Latin 60', 'M PLUS 1p';
  font-weight: 400;
}

.guide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
}

.content {
  width: 100%;
  height: fit-content;
  min-height: 100%;
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
  display: flex;
  justify-content: flex-start;
  min-height: 1.4em;
}

.lineNumber {
  position: absolute;
  left: -42px;
  width: 30px;
}

.lineNumberText {
  text-align: right;
  line-height: 1.4;
}

.dummyLineText {
  position: relative;
  line-height: 1.4;
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
</style>
