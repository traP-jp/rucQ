<script setup lang="ts">
import { ref, onMounted } from 'vue'
const emit = defineEmits(['close'])
import EventEditorSettings from '@/components/event/EventEditorSettings.vue'
import MarkdownPlatform from '@/components/markdown/MarkdownPlatform.vue'
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()

import type { components } from '@/api/schema'
type CampEvent = components['schemas']['Event']
const props = defineProps<{ event: CampEvent }>()

const tab = ref('')
const color = ref('')
const text = ref('')

const title = ref('')
const place = ref('')
const day = ref('')
const startTime = ref('')
const endTime = ref('')

onMounted(() => {
  text.value = props.event.description
  color.value = props.event.display_color
})

const isPreview = ref(false)
</script>

<!-- v-card じゃなくて v-sheet の方がよかったか -->

<template>
  <div :class="$style.container">
    <v-sheet :class="[$style.sheet, `bg-white`]">
      <div style="display: flex; align-items: center; justify-content: space-between">
        <v-btn
          @click="emit('close')"
          density="comfortable"
          elevation="0"
          icon="mdi-close"
          baseColor="transparent"
          class="text-black"
          style="margin: 10px"
        ></v-btn>
        <v-btn
          elevation="0"
          append-icon="mdi-check"
          baseColor="transparent"
          variant="flat"
          :color="color"
          style="font-size: 16px; margin: 10px"
          >更新</v-btn
        >
      </div>
      <v-tabs
        v-if="smAndDown"
        v-model="tab"
        :style="`flex-shrink: 0; color: var(--color-${color}); transition: color 0s;`"
      >
        <v-tab value="one" width="50%"><span style="font-weight: bold">設 定</span></v-tab>
        <v-tab value="two" width="50%"><span style="font-weight: bold">概 要</span></v-tab>
      </v-tabs>

      <v-tabs-window v-if="smAndDown" v-model="tab" style="height: 100%; flex-shrink: 1">
        <v-tabs-window-item value="one" style="height: 100%; padding: 20px">
          <EventEditorSettings
            v-model:title="title"
            v-model:place="place"
            v-model:day="day"
            v-model:startTime="startTime"
            v-model:endTime="endTime"
            v-model:color="color"
          />
        </v-tabs-window-item>

        <v-tabs-window-item value="two" style="height: 100%">
          <MarkdownPlatform
            v-model:isPreview="isPreview"
            v-model:text="text"
            :color="color"
          ></MarkdownPlatform>
        </v-tabs-window-item>
      </v-tabs-window>
      <div v-else style="display: flex; width: 100%; height: 100%">
        <EventEditorSettings
          style="width: 400px; height: 100%; padding: 20px; flex-shrink: 0"
          v-model:title="title"
          v-model:place="place"
          v-model:day="day"
          v-model:startTime="startTime"
          v-model:endTime="endTime"
          v-model:color="color"
        />
        <div style="width: 100%; height: 100%; position: relative">
          <MarkdownPlatform
            v-model:isPreview="isPreview"
            v-model:text="text"
            :color="color"
          ></MarkdownPlatform>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<style module>
.container {
  height: 100%;
}

.sheet {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  height: fit-content;
  height: 100%;
}
</style>
