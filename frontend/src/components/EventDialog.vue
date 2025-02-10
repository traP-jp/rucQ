<script setup lang="ts">
import { ref, onMounted } from 'vue'
const emit = defineEmits(['close'])
import MarkdownPreview from './MarkdownPreview.vue'
import EventEditor from './EventEditor.vue'
import { getTimeString } from '@/lib/date'

const props = defineProps<{
  event: CampEvent
}>()

const makeInfo = (event: CampEvent) => {
  return `${getTimeString(new Date(event.time_start))} ~ ${getTimeString(new Date(event.time_end))} @${event.location}`
}

const text = ref('')

const isPreview = ref(true)

onMounted(() => {
  text.value = props.event.description
})
</script>

<template>
  <v-card :class="`bg-white`" style="position: relative">
    <div :class="$style.title" :style="`background-color: var(--color-${event.display_color})`">
      <v-card rounded="0" elevation="0" :class="[$style.card, `bg-${event.display_color}`]">
        <template v-slot:title>
          <span style="font-weight: 700">{{ event.name }}</span>
        </template>
        <template v-slot:subtitle>
          <span>{{ makeInfo(event) }}</span>
        </template>
      </v-card>
      <div :class="$style.buttons">
        <v-btn
          @click="emit('close')"
          density="comfortable"
          elevation="0"
          icon="mdi-close"
          baseColor="transparent"
          class="text-white"
        ></v-btn>
        <v-dialog fullscreen transition="dialog-bottom-transition">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              density="comfortable"
              elevation="0"
              icon="mdi-square-edit-outline"
              baseColor="transparent"
              class="text-white"
              v-bind="activatorProps"
            ></v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <EventEditor :event="event" @close="isActive.value = false" />
          </template>
        </v-dialog>
      </div>
    </div>
    <div style="width: 100%; height: 100%; overflow-y: auto; background-color: var(--color-white)">
      <div style="height: 100%; padding: 4px 4px 40px 4px">
        <MarkdownPreview :isEditable="false" v-model:text="text" v-model:isPreview="isPreview" />
      </div>
    </div>

    <v-btn :class="[$style.join, 'text-white']" :baseColor="event.display_color">
      <span style="font-weight: bold">参　加　す　る</span>
    </v-btn>
  </v-card>
</template>

<style module>
.join {
  bottom: 0px;
  width: calc(100% - 20px);
  position: absolute;
  margin: 10px;
}

.card {
  height: fit-content;
  margin: auto 0;
}

.card :global(.v-card-subtitle) {
  opacity: 1 !important;
}

.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.buttons {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
}
</style>
