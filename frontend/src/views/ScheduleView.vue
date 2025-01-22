<script setup lang="ts">
import { getTimeStringNoPad } from '@/lib/date'
import { getLayout, type BlockGroup } from '@/lib/event-layout'
import { events, plans } from '@/lib/sample-data'
import EventBlock from '@/components/EventBlock.vue'
import { onMounted, ref } from 'vue'

const groups = ref<BlockGroup[]>([])

onMounted(() => {
  groups.value = getLayout(events, plans)
})

const onlyPlans = (group: BlockGroup) => {
  return group.Events.filter((event) => event.Column === 0).length === 0
  // 1 行目に表示されるイベントが存在しない場合 true が返る
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
          ? `grid-template-columns: 40px repeat(${group.Columns + 1}, 1fr);`
          : `grid-template-columns: 40px repeat(${group.Columns + 1}, 1fr);`
      "
    >
      <h5
        v-for="plan in group.Plans"
        :key="plan.ID"
        style="width: fit-content; border: 1px solid green; flex-grow: 0"
        :style="`grid-row: ${plan.Row * 2} / ${plan.Row * 2 + 1}; grid-column: ${2};`"
      >
        {{ plan.Text }}
      </h5>
      <EventBlock
        v-for="event in group.Events"
        :key="event.ID"
        :event="event"
        :style="`grid-row: ${event.Start * 2 + 1} / ${event.End * 2}; grid-column: ${event.Column + 2}`"
      />
      <div
        v-for="timehead in group.TimeTable"
        :key="timehead.Line"
        :class="$style.timehead"
        :style="`grid-row: ${timehead.Line * 2} / ${timehead.Line * 2 + 1}; grid-column: ${1};`"
      >
        <h5>{{ getTimeStringNoPad(new Date(timehead.Time)) }}</h5>
      </div>
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
  border: 1px solid white;
  margin-bottom: 20px;
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
  border: 1px solid yellow;
}
</style>
