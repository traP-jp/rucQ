<script setup lang="ts">
import { ref, onMounted } from 'vue'
const emit = defineEmits(['close'])
import MarkdownEditor from './MarkdownEditor.vue'
import MarkdownPreview from './MarkdownPreview.vue'
import ScrollableContent from '@/components/Generic/ScrollableContent.vue'
import EventEditorSettings from '@/components/EventEditorSettings.vue'
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
        v-model="tab"
        :style="`flex-shrink: 0; color: var(--color-${color}); transition: color 0s;`"
      >
        <v-tab value="one" width="50%"><span style="font-weight: bold">設 定</span></v-tab>
        <v-tab value="two" width="50%"><span style="font-weight: bold">概 要</span></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab" style="height: 100%; flex-shrink: 1">
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
          <MarkdownEditor
            v-if="!isPreview"
            :color="color"
            :class="$style.description"
            :isPreviewable="true"
            v-model:text="text"
          >
            <v-btn
              @click="isPreview = true"
              density="comfortable"
              elevation="0"
              icon="mdi-eye-outline"
              baseColor="transparent"
              :class="`text-${color}`"
              style="margin-bottom: 10px"
            ></v-btn
          ></MarkdownEditor>
          <div style="width: 100%; height: 100%" v-else>
            <ScrollableContent>
              <MarkdownPreview
                v-model:text="text"
                v-model:isPreview="isPreview"
                style="padding: 10px"
              />
            </ScrollableContent>
            <div :class="$style.button">
              <v-btn
                @click="isPreview = false"
                density="comfortable"
                icon="mdi-square-edit-outline"
                baseColor="white"
                :class="`text-${color}`"
              ></v-btn>
            </div>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
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
  /* margin: 60px 0 0 0;
  height: calc(100% - 60px); */
  height: 100%;
  /* 後ろが見えた方が閉塞感ないかなぁと思いつつ若干微妙な気もする */
}

.description {
  width: 100%;
  height: 100%;
  flex-shrink: 1;
  background-color: var(--color-white);
}

.button {
  position: absolute;
  top: 10px;
  right: 6px;
}
</style>
