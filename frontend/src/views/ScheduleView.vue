<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDayStringNoPad, getTimeStringNoPad } from '@/lib/date'
import { getLayout, type DayGroup } from '@/lib/event-layout'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'
import EventBlock from '@/components/EventBlock.vue'
import { events, camp } from '@/lib/sample-data'
const { xs } = useDisplay()

const dayGroups = ref<DayGroup[]>([])

onMounted(() => {
  dayGroups.value = getLayout(events, camp)
})
</script>

<template>
  <mobile-header v-if="xs" title="スケジュール" />
  <div :class="$style.container" v-if="dayGroups.length > 0">
    <div v-for="(dayGroup, i) in dayGroups" :key="i" :class="$style.day">
      <h2 style="margin-bottom: 20px; font-weight: 700; font-family: 'Avenir Next'">
        {{ `Day ${i + 1} - ${getDayStringNoPad(dayGroup.date)}` }}
      </h2>
      <div
        v-for="(eventGroup, j) in dayGroup.eventGroups"
        :key="j"
        :style="`display: grid; grid-template-columns: 50px repeat(${Math.max(eventGroup.columns, 1)}, 1fr);`"
      >
        <div
          v-for="(space, k) in eventGroup.spaces"
          :key="k"
          :style="`grid-row: ${k + 1}; grid-column: 2 / ${eventGroup.columns + 2};`"
        >
          <hr
            v-if="space.line"
            style="border: 0px; border-top: 1px dashed var(--color-line); margin-top: -0.5px"
          />
        </div>
        <EventBlock
          v-for="(event, k) in eventGroup.events"
          :key="k"
          :event="event.content"
          :style="`grid-row: ${event.startRow + 1} / ${event.endRow + 1}; grid-column: ${event.column + 2}`"
        />
        <div
          v-for="(moment, k) in eventGroup.moments"
          :key="k"
          :style="`grid-row: ${moment.startRow + 1}; grid-column: ${moment.column + 2}; display: flex; align-items: center;`"
        >
          <h5 style="font-weight: 500">{{ moment.content.name }}</h5>
        </div>
        <div
          v-for="(space, k) in eventGroup.spaces"
          :key="k"
          :style="`grid-row: ${k + 1}; grid-column: 1; min-height: ${space.minHeight === 'wide' ? 24 : 8}px;`"
        >
          <div
            v-if="space.stamp !== 'none'"
            :style="`height: 100%; display: flex; align-items: ${space.stamp};`"
          >
            <div
              style="
                height: 0px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <h5 style="font-weight: 900; width: fit-content">
                {{ getTimeStringNoPad(space.time) }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  height: 100%;
  overflow: hidden;
  width: 100%;
  margin: auto;
  padding: 20px 10px;
  max-width: 600px;
}
</style>
