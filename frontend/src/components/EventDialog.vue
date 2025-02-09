<script setup lang="ts">
import { ref, onMounted } from 'vue'
const emit = defineEmits(['close'])
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
          :baseColor="`${event.display_color}`"
        ></v-btn>
        <v-btn
          density="comfortable"
          elevation="0"
          icon="mdi-square-edit-outline"
          :baseColor="`${event.display_color}`"
        ></v-btn>
      </div>
    </div>
    <MarkdownEditor color="orange" v-if="!isPreview" v-model:text="text" />

    <!-- <MarkdownPreview v-else v-model:text="text" />
      <EditPreviewButton :class="$style.button" v-model:isPreview="isPreview" /> -->
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
