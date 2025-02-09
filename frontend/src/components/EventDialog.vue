<script setup lang="ts">
import { ref, onMounted } from 'vue'
// const emit = defineEmits(['close'])
import MarkdownEditor from './MarkdownEditor.vue'
import { getTimeString } from '@/lib/date'

const props = defineProps<{
  event: CampEvent
}>()

const makeInfo = (event: CampEvent) => {
  return `${getTimeString(new Date(event.time_start))} ~ ${getTimeString(new Date(event.time_end))} @${event.location}`
}

const text = ref('')

const isPreview = ref(false)

onMounted(() => {
  text.value = props.event.description
})
</script>

<template>
  <v-card text-high-emphasis :class="[`bg-${event.display_color}`, $style.card]">
    <template v-slot:title>
      <span style="font-weight: 700">{{ event.name }}</span>
    </template>
    <template v-slot:subtitle>
      <span>{{ makeInfo(event) }}</span>
    </template>
    <MarkdownEditor color="orange" v-if="!isPreview" v-model:text="text" />
    <!-- <MarkdownPreview v-else v-model:text="text" />
      <EditPreviewButton :class="$style.button" v-model:isPreview="isPreview" /> -->
  </v-card>
</template>

<style module>
.card :global(.v-card-subtitle) {
  opacity: 1 !important;
}
</style>
