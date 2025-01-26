<script setup lang="ts">
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()
import { getEvents } from '@/api/handler'
import { getTimeStringNoPad, getDayString } from '@/lib/date'
import { getLayout, epoch, type BlockGroup } from '@/lib/event-layout'
import EventBlock from '@/components/EventBlock.vue'
import { onMounted, ref, watch } from 'vue'

const days = ref<{ dateString: string; groups: BlockGroup[] }[]>([])

const popUp = defineModel<CampEvent | undefined>('popUp')

const refresh = async () => {
  const res = (await getEvents()) as CampEvent[]
  console.log(res)
  days.value = []
  const dayStrings: string[] = []
  for (const group of getLayout(res)) {
    const date = new Date(group.TimeTable[0].Time)
    const index = dayStrings.indexOf(getDayString(date))
    if (index === -1) {
      days.value.push({ dateString: getDayString(date), groups: [group] })
      dayStrings.push(getDayString(date))
    } else {
      days.value[index].groups.push(group)
    }
  }
}

onMounted(refresh)

const onlyPlans = (group: BlockGroup) => {
  return group.Durations.filter((duration) => duration.Column === 0).length === 0
  // 1 行目に表示されるイベントが存在しないか、そもそもイベントが存在しない場合 true が返る
  // true の場合はプランの横幅を可変にし、最大長をもとの長さにする
}

watch(
  () => popUp.value,
  async () => {
    await refresh()
  },
  { deep: true },
)
</script>

<template>
  <mobile-header v-if="xs" title="スケジュール" />
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
            v-if="!group.Moments.map((p) => epoch(p.time_start)).includes(timehead.Time)"
            style="border: 0px; border-top: 1px dashed var(--color-line); margin-top: -0.5px"
          />
        </div>
        <div
          v-for="moment in group.Moments"
          :key="moment.id"
          :class="$style.plan"
          :style="`grid-row: ${(moment.Row - group.Start) * 2 + 1} / ${(moment.Row - group.Start) * 2 + 2}; grid-column: 2;`"
        >
          <h5 style="font-weight: 500">{{ moment.name }}</h5>
        </div>
        <EventBlock
          v-for="duration in group.Durations"
          :key="duration.id"
          :event="duration"
          :style="`grid-row: ${(duration.Start - group.Start) * 2 + 2} / ${(duration.End - group.Start) * 2 + 1}; grid-column: ${duration.Column + 2}`"
          v-model:popUp="popUp"
        />
      </div>
    </div>
    <!-- <EventPopUp v-if="popUp !== 0" v-model:popUp="popUp" /> -->
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
