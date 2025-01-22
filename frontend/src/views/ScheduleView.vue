<script setup lang="ts">
import { getTimeStringNoPad } from '@/lib/date'
import { getLayout, type BlockGroup } from '@/lib/event-layout'
import { events, plans } from '@/lib/sample-data'
import EventBlock from '@/components/EventBlock.vue'
import { onMounted, ref } from 'vue'

const groups = ref<BlockGroup[]>([])

onMounted(() => {
  groups.value = getLayout(events, plans)
  for (const group of groups.value) {
    console.log(onlyPlans(group))
  }
})

const onlyPlans = (group: BlockGroup) => {
  return group.Events.filter((event) => event.Column === 0).length === 0
  // 1 行目に表示されるイベントが存在しないか、そもそもイベントが存在しない場合 true が返る
  // true の場合はプランの横幅を可変にし、最大長をもとの長さにする
}
</script>

<template>
  <div :class="$style.container" v-if="groups.length > 0">
    <div
      v-for="group in groups"
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
        :style="`grid-row: ${timehead.Line * 2} / ${timehead.Line * 2 + 1}; grid-column: 1;`"
      >
        <h5>{{ getTimeStringNoPad(new Date(timehead.Time)) }}</h5>
      </div>
      <div
        v-for="plan in group.Plans"
        :key="plan.ID"
        :class="$style.plan"
        :style="`grid-row: ${plan.Row * 2} / ${plan.Row * 2 + 1}; grid-column: 2;`"
      >
        <h5>{{ plan.Text }}</h5>
      </div>
      <EventBlock
        v-for="event in group.Events"
        :key="event.ID"
        :event="event"
        :style="`grid-row: ${event.Start * 2 + 1} / ${event.End * 2}; grid-column: ${event.Column + 2}`"
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

.blockgroup {
  display: grid;
  grid-template-rows: minmax(1fr, 2fr);
}

.plan {
  width: fit-content;
  flex-grow: 0;
  padding: 4px;
}

.timehead {
  margin: auto 0;
  width: 40px;
  overflow: visible;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 0px;
}
</style>
