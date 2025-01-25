<script setup lang="ts">
import { getTimeStringNoPad, getDayString } from '@/lib/date'
import { getLayout, epoch, type BlockGroup } from '@/lib/event-layout'
import { events, plans } from '@/lib/sample-data'
import EventBlock from '@/components/EventBlock.vue'
import { onMounted, ref } from 'vue'

const days = ref<{ dateString: string; groups: BlockGroup[] }[]>([])

onMounted(() => {
  days.value = []
  const dayStrings: string[] = []
  for (const group of getLayout(events, plans)) {
    const date = new Date(group.TimeTable[0].Time)
    const index = dayStrings.indexOf(getDayString(date))
    if (index === -1) {
      days.value.push({ dateString: getDayString(date), groups: [group] })
      dayStrings.push(getDayString(date))
    } else {
      days.value[index].groups.push(group)
    }
  }
})

const onlyPlans = (group: BlockGroup) => {
  return group.Events.filter((event) => event.Column === 0).length === 0
  // 1 行目に表示されるイベントが存在しないか、そもそもイベントが存在しない場合 true が返る
  // true の場合はプランの横幅を可変にし、最大長をもとの長さにする
}
</script>

<template>
  <div :class="$style.container" v-if="days.length > 0">
    <div v-for="(day, index) in days" :key="day.dateString">
      <h2 style="margin-bottom: 20px; font-weight: 700; font-family: 'Avenir Next'">
        {{ `Day ${index} - ${day.dateString}` }}
      </h2>
      <div
        v-for="group in day.groups"
        :key="group.Start"
        :class="$style.blockgroup"
        :style="
          onlyPlans(group)
            ? `grid-template-columns: 40px repeat(${group.Columns}, 1fr);`
            : `grid-template-columns: 40px repeat(${group.Columns}, 1fr);`
        "
      >
        <div
          v-for="timehead in group.TimeTable"
          :key="timehead.Line"
          :class="$style.timehead"
          :style="`grid-row: ${(timehead.Line - group.Start) * 2 + 1} / ${(timehead.Line - group.Start) * 2 + 2}; grid-column: 1;`"
        >
          <h5 style="font-family: 'Avenir Next'; font-weight: 700">
            {{ getTimeStringNoPad(new Date(timehead.Time)) }}
          </h5>
        </div>
        <div
          v-for="timehead in group.TimeTable"
          :key="timehead.Line"
          style="margin-bottom: 20px"
          :style="`grid-row: ${(timehead.Line - group.Start) * 2 + 2} / ${(timehead.Line - group.Start) * 2 + 3}; grid-column: 1;`"
        ></div>
        <div
          v-for="timehead in group.TimeTable"
          :key="timehead.Line"
          :class="$style.line"
          :style="`grid-row: ${(timehead.Line - group.Start) * 2 + 2} / ${(timehead.Line - group.Start) * 2 + 3}; grid-column: 2 / 100;`"
        >
          <hr
            v-if="!group.Plans.map((p) => epoch(p.At)).includes(timehead.Time)"
            style="border: 0px; border-top: 1px dashed var(--color-line); margin-top: -0.5px"
          />
        </div>
        <div
          v-for="plan in group.Plans"
          :key="plan.ID"
          :class="$style.plan"
          :style="`grid-row: ${(plan.Row - group.Start) * 2 + 1} / ${(plan.Row - group.Start) * 2 + 2}; grid-column: 2;`"
        >
          <h5 style="font-weight: 500">{{ plan.Text }}</h5>
        </div>
        <EventBlock
          v-for="event in group.Events"
          :key="event.ID"
          :event="event"
          :style="`grid-row: ${(event.Start - group.Start) * 2 + 2} / ${(event.End - group.Start) * 2 + 1}; grid-column: ${event.Column + 2}`"
        />
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  margin: auto;
  padding: 20px 10px;
  max-width: 600px;
}

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
}
</style>
