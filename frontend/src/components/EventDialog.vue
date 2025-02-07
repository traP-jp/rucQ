<script setup lang="ts">
// const emit = defineEmits(['close'])
import { getTimeString } from '@/lib/date'

defineProps<{
  event: CampEvent
}>()

const makeInfo = (event: CampEvent) => {
  return `${getTimeString(new Date(event.time_start))} ~ ${getTimeString(new Date(event.time_end))} @${event.location}`
}
</script>

<template>
  <v-card text-high-emphasis :class="[`bg-${event.display_color}`, $style.card]">
    <template v-slot:title>
      <span style="font-weight: 700">{{ event.name }}</span>
    </template>
    <template v-slot:subtitle>
      <span>{{ makeInfo(event) }}</span>
    </template>
    <!-- <v-card-text style="bg-surface-light pt-4">
      {{ event.description }}
    </v-card-text> -->
  </v-card>
</template>

<style module>
.card :global(.v-card-subtitle) {
  opacity: 1 !important;
}
</style>
