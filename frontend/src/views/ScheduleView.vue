<script setup lang="ts">
import { onMounted } from 'vue'
import { getLayout } from '@/lib/event-layout'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'
import EventBlock from '@/components/EventBlock.vue'
import { events, camp } from '@/lib/sample-data'
const { xs } = useDisplay()

onMounted(() => {
  console.log(getLayout(events, camp))
})
</script>

<template>
  <mobile-header v-if="xs" title="スケジュール" />
  <div :class="$style.container">
    <div :class="$style.day">
      <h2 style="margin-bottom: 20px; font-weight: 700; font-family: 'Avenir Next'">
        {{ `Day 1 - 9/13` }}
      </h2>
      <!-- その日全体のイベント -->
      <div :class="$style.dayEvents1">
        <!-- その日のあるイベントグループ -->
        <!-- ここに grid-row と grid-column を持った要素を並べる -->
        <EventBlock :event="events[2]" style="grid-row: 1 / 3; grid-column: 1" />
        <EventBlock :event="events[5]" style="grid-row: 2 / 4; grid-column: 2" />
        <EventBlock :event="events[8]" style="grid-row: 3 / 5; grid-column: 3" />
        <EventBlock :event="events[12]" style="grid-row: 7; grid-column: 1" />
        <EventBlock :event="events[13]" style="grid-row: 8; grid-column: 1" />
        <EventBlock :event="events[14]" style="grid-row: 9; grid-column: 1" />
      </div>
      <div :class="$style.dayEvents2">
        <!-- その日のあるイベントグループ -->
        <EventBlock :event="events[2]" style="grid-row: 1 / 3; grid-column: 1" />
        <EventBlock :event="events[5]" style="grid-row: 2 / 4; grid-column: 2" />
        <EventBlock :event="events[8]" style="grid-row: 3 / 5; grid-column: 1" />
        <EventBlock :event="events[12]" style="grid-row: 7; grid-column: 2" />
        <EventBlock :event="events[13]" style="grid-row: 8; grid-column: 2" />
        <EventBlock :event="events[14]" style="grid-row: 9; grid-column: 2" />
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

.dayEvents1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.dayEvents2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

/* 
.blockgroup {
  display: grid;
  grid-template-rows: minmax(1fr, 2fr);
}

.plan {
  flex-grow: 0;
  width: fit-content;
  overflow: visible;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
  height: 0px;
}

.timehead {
  margin: auto 0;
  padding-right: 10px;
  width: 50px;
  overflow: visible;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 0px;
}

.line {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
} */
</style>
