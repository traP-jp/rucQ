<script setup lang="ts">
import { getLayoutX } from '@/lib/event-layout'
import { events, plans } from '@/lib/sample-data'
import EventBlock from '@/components/EventBlock.vue'
import { onMounted } from 'vue'

onMounted(() => {
  const arrange = getLayoutX(events, plans, '2024-09-10T08:00:00.000000+09:00')
  console.log(arrange)
})
</script>

<template>
  <div :class="$style.container"></div>
</template>

<style module>
.container {
  margin: auto;
  width: 400px;
  height: 100vh;
  border: 1px solid black;
}
</style>
