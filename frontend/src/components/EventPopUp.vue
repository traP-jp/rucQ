<!-- 旧イベントダイアログ用コンポーネント -->
<!-- 置き換えが済み次第削除します -->

<template>
  <div :class="$style.container" @wheel="handleScroll">
    <div :class="$style.column">
      <div :class="$style.content">
        <div :class="$style.head" :style="`background: #${popUp!.display_color};`">
          <div :class="$style.titles">
            <h3 :class="$style.name">{{ popUp!.name }}</h3>
            <h6 :class="$style.info">{{ makeInfo(popUp!) }}</h6>
          </div>
          <button v-if="isPreview" :class="$style.epbutton" @click="isPreview = false">
            <v-icon icon="mdi-square-edit-outline" :class="$style.icon"></v-icon>
          </button>
          <button :class="$style.clbutton" @click="popUp = undefined">
            <v-icon icon="mdi-close" :class="$style.icon"></v-icon>
          </button>
        </div>
        <div v-if="!isPreview">
          <MarkdownEditor v-model:text="text" />
          <div style="width: 100%; padding: 0 10px 15px 10px; background: var(--color-theme-pale)">
            <button
              :class="$style.sendbutton"
              :style="`background: #${popUp!.display_color};`"
              @click="
                async () => {
                  const newEvent = makeEventParams(popUp!)
                  newEvent.description = text
                  await editEvent(popUp!.id, newEvent)
                  popUp = undefined
                }
              "
            >
              <h3 style="color: var(--color-background); font-weight: bold; padding: 5px">
                送　信
              </h3>
            </button>
          </div>
        </div>
        <MarkdownPreview v-else v-model:text="text" style="background: var(--color-background)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { editEvent, makeEventParams } from '@/api/handler'
import MarkdownEditor from './MarkdownEditor.vue'
import MarkdownPreview from './MarkdownPreview.vue'
import { getTimeString } from '@/lib/date'

const popUp = defineModel<CampEvent | undefined>('popUp')

const handleScroll = (event: WheelEvent) => {
  event.preventDefault()
}

const isPreview = ref(true)
const text = ref('')

const makeInfo = (event: CampEvent) => {
  return `${getTimeString(new Date(event.time_start))} ~ ${getTimeString(new Date(event.time_end))} @${event.location}`
}

onMounted(() => {
  text.value = popUp.value!.description
})
</script>

<style module>
.container {
  position: fixed;
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

.icon {
  font-size: 24px;
}

.sendbutton {
  width: 100%;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
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
