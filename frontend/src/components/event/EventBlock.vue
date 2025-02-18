<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiClient } from '@/api/apiClient'
import EventDialog from '@/components/event/EventDialog.vue'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const { userId } = storeToRefs(useUserStore())

import type { components } from '@/api/schema'
type CampEvent = components['schemas']['Event']
const props = defineProps<{ event: CampEvent }>()

const participants = ref<string[]>([])

onMounted(async () => {
  const participantsData = (
    await apiClient.GET('/api/events/{event_id}/participants', {
      params: { path: { event_id: props.event!.id } },
    })
  ).data!
  participants.value = Array.from(
    participantsData.filter((el) => el.traq_id !== userId.value),
    (el) => el.traq_id,
  )
  if (participantsData.some((el) => el.traq_id === userId.value)) {
    participants.value.unshift(userId.value!)
  }
})
</script>

<template>
  <div :class="$style.container">
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-card
          link
          :class="$style.card"
          :color="event.display_color"
          height="100%"
          variant="flat"
          v-bind="activatorProps"
        >
          <div :class="$style.content">
            <h3 style="font-weight: 700" :class="$style.text">{{ props.event.name }}</h3>
            <h5 style="font-weight: 500" :class="$style.text">{{ props.event.location }}</h5>
          </div>
        </v-card>
      </template>

      <template v-slot:default="{ isActive }">
        <EventDialog
          :event="event"
          @close="isActive.value = false"
          style="height: 100%; overflow: hidden"
          v-model:participants="participants"
        />
      </template>
    </v-dialog>
  </div>
</template>

<style module>
.container {
  padding: 4px;
  color: var(--color-exwhite);
}

.card {
  width: 100%;
  height: 100%;
  padding: 10px;
  margin: 0px;
  cursor: pointer; /* ボタンのようにクリック可能に */
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.text {
  color: var(--color-exwhite);
  overflow-wrap: break-word;
}
</style>
