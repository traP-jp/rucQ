<script setup lang="ts">
import type { DurationBlock } from '@/lib/event-layout'

const props = defineProps<{
  event: DurationBlock
}>()

const popUp = defineModel<number>('popUp')
</script>

<template>
  <button :class="$style.container" @click="popUp = event.id">
    <div :class="$style.content" :style="`background-color: #${event.display_color}`">
      <h3 style="font-weight: 700">{{ props.event.name }}</h3>
      <h5 style="font-weight: 500">{{ props.event.location }}</h5>
    </div>
  </button>
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
