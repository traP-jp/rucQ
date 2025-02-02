<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount, ref } from 'vue'
const text = defineModel<string>('text')
const lineCount = ref<number>(1)
const lineHeights = ref<Record<number, number>>({})
const editor = ref<HTMLTextAreaElement | null>(null)

// GPT 産
const updateLine = () => {
  if (!text.value || !editor.value) return
  const lines = text.value.split('\n')
  lineCount.value = lines.length
  const computedHeights: Record<number, number> = {}

  lines.forEach((_, index) => {
    const div = document.createElement('div')
    div.style.visibility = 'hidden'
    div.style.position = 'absolute'
    div.style.whiteSpace = 'pre-wrap'
    div.style.overflowWrap = 'break-word'
    div.style.width = `${editor.value!.offsetWidth - 8}px`
    // div.style.borderLeft = '1px dashed black'
    div.style.paddingLeft = '1px'
    div.style.fontFamily = getComputedStyle(editor.value!).fontFamily
    div.style.fontSize = getComputedStyle(editor.value!).fontSize
    div.textContent = lines[index] || ' '
    document.body.appendChild(div)
    computedHeights[index + 1] = div.offsetHeight
    document.body.removeChild(div)
  })

  lineHeights.value = computedHeights
}

watch(text, updateLine)

onMounted(async () => {
  window.addEventListener('resize', updateLine)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateLine)
})

onMounted(() => {
  updateLine()
})
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.numbers">
      <div v-for="line in lineCount" :key="line" :style="{ height: lineHeights[line] + 'px' }">
        {{ line }}
      </div>
    </div>
    <textarea v-model="text" :class="$style.input" ref="editor"></textarea>
  </div>
</template>

<style module>
.container {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: var(--color-theme-pale);
  display: flex;
  font-family: 'M PLUS Code Latin 60', 'M PLUS 1p';
  font-weight: 400;
}

.input {
  width: 100%;
  height: 100%;
  resize: none;
  /* scrollbar-gutter: stable; */
  border-left: 1px dashed var(--color-theme);
  padding-left: 4px;
}

.numbers {
  text-align: right;
  width: 20px;
  margin-right: 4px;
  color: var(--color-theme);
}
</style>
