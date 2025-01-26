<template>
  <div :class="$style.container" @wheel="handleScroll">
    <div :class="$style.column">
      <div :class="$style.content">
        <div :class="$style.head">
          <div :class="$style.titles">
            <h3 :class="$style.name">リアル脱出ゲーム</h3>
            <h6 :class="$style.info">2日目 22:00 ~ 23:30 @会議室</h6>
          </div>
          <EditPreviewButton :class="$style.epbutton" v-model:isPreview="isPreview" />
          <button :class="$style.clbutton">
            <v-icon icon="mdi-close" :class="$style.icon"></v-icon>
          </button>
        </div>
        <MarkdownEditor v-if="!isPreview" v-model:text="text" />
        <MarkdownPreview v-else v-model:text="text" style="background: var(--color-background)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MarkdownEditor from './MarkdownEditor.vue'
import MarkdownPreview from './MarkdownPreview.vue'
import EditPreviewButton from './EditPreviewButton.vue'

const handleScroll = (event: WheelEvent) => {
  event.preventDefault()
}

const isPreview = ref(false)
const text = ref('')
</script>

<style module>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1100;
}

.column {
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content {
  overflow: hidden;
  border-radius: 10px;
  height: fit-content;
}

.head {
  position: relative;
  height: 80px;
  display: flex;
  background: var(--color-green);
  align-items: top;
  justify-content: space-between;
}

.name {
  color: var(--color-background);
  font-weight: bold;
  margin-left: 10px;
  padding-top: 20px;
}

.info {
  color: var(--color-background);
  font-weight: bold;
  margin-left: 12px;
}

.epbutton {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: var(--color-background);
}

.clbutton {
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--color-background);
}
</style>

<!-- <script setup lang="ts"></script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <MarkdownEditor />
    </div>
  </div>
</template>

<style module>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.content {
  margin: auto;
  margin-top: 40px;
  width: 100%;
  max-width: 800px;
  padding: 40px;
  background-color: red;
}
</style> -->
