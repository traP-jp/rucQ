<script setup lang="ts">
import type { EventBlock } from '@/lib/event-layout'

const props = defineProps<{
  event: EventBlock
}>()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content" :style="`background-color: #${event.Color}`">
      <h3 style="font-weight: 700">{{ props.event.Title }}</h3>
      <h5 style="font-weight: 500">{{ props.event.Place }}</h5>
    </div>
  </div>
</template>

<style module>
.container {
  padding: 4px;
  flex-grow: 0;
  color: var(--color-exwhite);
}

.content {
  width: 100%;
  height: 100%;
  background-color: #0088ff;
  padding: 10px;
  border-radius: 10px;
}
</style>
