<script setup lang="ts">
import type { Event } from '@/lib/event-layout'

const props = defineProps<{
  event: Event
}>()
</script>

<template>
  <div :class="$style.container">
    <h2>{{ props.event.Title }}</h2>
    <h5>{{ props.event.Place }}</h5>
  </div>
</template>

<style module>
.container {
  background-color: blue;
  padding: 10px;
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
</style>
