<script setup lang="ts">
import type { EventBlock } from '@/lib/event-layout'

const props = defineProps<{
  event: EventBlock
}>()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <h2 style="font-weight: 700">{{ props.event.Title }}</h2>
      <h5 style="font-weight: 500">{{ props.event.Place }}</h5>
    </div>
  </div>
</template>

<style module>
.container {
  width: 100%;
  padding: 4px;
}

.content {
  background-color: rgb(185, 9, 9);
  padding: 10px;
  border-radius: 10px;
}
</style>
