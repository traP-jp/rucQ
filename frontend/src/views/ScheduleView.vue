<script setup lang="ts">
import { getLayout, type BlockGroup } from '@/lib/event-layout'
import { events, plans } from '@/lib/sample-data'
import EventBlock from '@/components/EventBlock.vue'
import { onMounted, ref } from 'vue'

const groups = ref<BlockGroup[]>([])

onMounted(() => {
  groups.value = getLayout(events, plans, '2024-09-10T08:00:00.000000+09:00')
})
</script>

<template>
  <div :class="$style.container" v-if="groups.length > 0">
    <div
      v-for="group in groups"
      :key="group.StartRow"
      :style="`display: grid; grid-template-columns: repeat(${group.Events.length}, 1fr); border: 1px solid white;`"
    >
      <EventBlock
        v-for="event in group.Events"
        :key="event.ID"
        :event="event"
        :style="`grid-row: ${event.StartRow} / ${event.EndRow}; grid-column: ${event.Column - 1}`"
      />
    </div>
  </div>
</template>

<style module>
.container {
  margin: auto;
  width: 400px;
  height: 100vh;
  border: 1px solid black;
}
</style>
