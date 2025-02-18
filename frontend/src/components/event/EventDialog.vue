<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
const emit = defineEmits(['close', 'refresh'])
import MarkdownPreview from '@/components/markdown/MarkdownPreview.vue'
import EventEditor from './EventEditor.vue'
import UserIcon from '@/components/generic/UserIcon.vue'
import { getDayStringNoPad, getTimeStringNoPad } from '@/lib/date'
import type { components } from '@/api/schema'
import { apiClient } from '@/api/apiClient'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const { userId } = storeToRefs(useUserStore())

type CampEvent = components['schemas']['Event']
const props = defineProps<{ event: CampEvent }>()

const makeInfo = (event: CampEvent) => {
  return `${getDayStringNoPad(new Date(event.time_start))} ${getTimeStringNoPad(new Date(event.time_start))} ~ ${getTimeStringNoPad(new Date(event.time_end))} @${event.location}`
}

const text = ref('')
const participants = defineModel<string[]>('participants')
const isToParticipate = computed(
  () => participants.value!.length > 0 && participants.value![0] === userId.value,
)

const participate = async () => {
  await apiClient.POST('/api/events/{event_id}/register', {
    params: { path: { event_id: props.event!.id } },
  })
  participants.value!.unshift(userId.value!)
}

const withdraw = async () => {
  await apiClient.DELETE('/api/events/{event_id}/register', {
    params: { path: { event_id: props.event!.id } },
  })
  participants.value!.shift()
}

const enumHeight = (i: number) => {
  if (i === 0) return 0
  return 66 - 16 * (3 - i)
}

onMounted(() => {
  text.value = props.event.description
})
</script>

<template>
  <v-card :class="`bg-white`">
    <div :class="$style.title" :style="`background-color: var(--color-${event.display_color})`">
      <v-card rounded="0" elevation="0" :class="[$style.card, `bg-${event.display_color}`]">
        <template v-slot:title>
          <span style="font-weight: 700">{{ event.name }}</span>
        </template>
        <template v-slot:subtitle>
          <span>{{ makeInfo(event) }}</span>
        </template>
      </v-card>
      <div :class="$style.buttons">
        <v-btn
          @click="emit('close')"
          density="comfortable"
          elevation="0"
          icon="mdi-close"
          baseColor="transparent"
          class="text-white"
        ></v-btn>
        <v-dialog fullscreen transition="dialog-bottom-transition">
          <!-- PC からの操作を可能にするなら別の表示方法を考える -->
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              density="comfortable"
              elevation="0"
              icon="mdi-square-edit-outline"
              baseColor="transparent"
              class="text-white"
              v-bind="activatorProps"
            ></v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <EventEditor
              :event="event"
              @close="isActive.value = false"
              @refresh="(emit('refresh'), (isActive.value = false))"
            />
          </template>
        </v-dialog>
      </div>
    </div>
    <div
      :style="`display: flex; background-color: var(--color-light-gray); height: 100%; overflow: hidden;`"
    >
      <div :class="$style.sideIcons">
        <div style="border-bottom: 1px solid var(--color-gray); margin-bottom: 4px">
          <UserIcon :id="event.organizer_traq_id" :size="30" />
        </div>
        <div
          :style="`position: relative; width: 30px; height: ${enumHeight(participants!.slice(0, 3).length)}px`"
        >
          <UserIcon
            v-for="(user, i) in participants!.slice(0, 3).reverse()"
            :key="i"
            :id="user"
            :size="24"
            :class="$style.participants"
            :style="`top: ${16 * (participants!.slice(0, 3).length - 1 - i)}px`"
          />
        </div>
        <v-btn
          elevation="0"
          :color="event.display_color"
          variant="text"
          density="compact"
          :icon="isToParticipate ? 'mdi-minus' : 'mdi-plus'"
          style="background-color: var(--color-white)"
          @click="isToParticipate ? withdraw() : participate()"
        ></v-btn>
      </div>
      <div :class="$style.description">
        <MarkdownPreview :isEditable="false" v-model:text="text" />
      </div>
    </div>
  </v-card>
</template>

<style module>
.join {
  bottom: 0px;
  width: calc(100% - 20px);
  position: absolute;
  margin: 10px;
  z-index: 1;
}

.card {
  height: fit-content;
  margin: auto 0;
}

.card :global(.v-card-subtitle) {
  opacity: 1 !important;
}

.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.buttons {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
}

.description {
  width: 100%;
  overflow-y: auto;
  background-color: var(--color-white);
  margin: 6px;
  border-radius: 4px;
  position: relative;
}

.sideIcons {
  width: 30px;
  height: fit-content;
  margin: 6px 0 6px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.participants {
  border: 3px solid var(--color-light-gray);
  box-sizing: content-box;
  position: absolute;
}
</style>
