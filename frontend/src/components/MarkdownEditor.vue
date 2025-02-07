<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount, ref } from 'vue'
const text = defineModel<string>('text')
const editor = ref<HTMLTextAreaElement | null>(null)

defineProps<{
  color: string
}>()

// GPT 産
const updateLine = () => {}

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
    <!-- <div :class="$style.numbers">
      <div v-for="line in lineCount" :key="line" :style="{ height: lineHeights[line] + 'px' }">
        {{ line }}
      </div>
    </div> -->
    <div style="width: 26px"></div>
    <div :style="`border-left: 1px dashed var(--color-${color}); padding-right: 6px`"></div>
    <div :class="$style.content">
      <div style="z-index: 1000">
        <textarea v-model="text" :class="$style.input" ref="editor"></textarea>
      </div>
      <div :class="$style.dummy" v-if="text">
        <div v-for="(line, i) in text.split('\n')" :key="i" :class="$style.dummyLine">
          <div :class="$style.lineNumber">
            <p :class="$style.lineNumberText" :style="`color: var(--color-${color})`">
              {{ i }}
            </p>
          </div>
          <p :class="$style.dummyLineText">{{ line }}</p>
        </div>
      </div>
    </div>
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

.content {
  width: 100%;
  height: 100%;
  position: relative;
}

.dummy {
  top: 0px;
  width: 100%;
  position: absolute;
  font-family: 'M PLUS Code Latin 60', 'M PLUS 1p';
  white-space: pre-wrap;
  overflow-wrap: break-word;
  z-index: 0;
}

.dummyLine {
  position: relative;
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
  color: transparent;
  font-weight: 500;
  position: relative;
  line-height: 1.4;
  min-height: 1.4em;
}

.input {
  position: absolute;
  width: 100%;
  height: 100%;
  resize: none;
  /* scrollbar-gutter: stable; */
  line-height: 1.4;
  overflow: hidden;
  z-index: 1;
}
</style>
