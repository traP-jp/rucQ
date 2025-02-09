<script setup lang="ts">
import { ref, onMounted } from 'vue'
const emit = defineEmits(['close'])
import MarkdownPreview from './MarkdownPreview.vue'
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
  <v-card :class="`bg-${event.display_color}`">
    <div :class="$style.title">
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
        ></v-btn>
        <v-btn
          density="comfortable"
          elevation="0"
          icon="mdi-square-edit-outline"
          baseColor="transparent"
        ></v-btn>
      </div>
    </div>
    <div style="height: 100%; overflow-y: auto; background-color: var(--color-white)">
      <MarkdownPreview :isEditable="false" v-model:text="text" v-model:isPreview="isPreview" />
    </div>
  </v-card>
</template>

<style module>
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
