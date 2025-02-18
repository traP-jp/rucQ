<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EventDialog from '@/components/event/EventDialog.vue'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['refresh'])

const { user } = storeToRefs(useUserStore())

import type { components } from '@/api/schema'
type CampEvent = components['schemas']['Event']
const props = defineProps<{ event: CampEvent }>()

const participants = ref<string[]>([])

onMounted(async () => {
  const participantsData = props.event.participants
  participants.value = Array.from(
    participantsData.filter((el) => el.traq_id !== user.value?.traq_id),
    (el) => el.traq_id,
  )
  if (participantsData.some((el) => el.traq_id === user.value?.traq_id)) {
    participants.value.unshift(user.value!.traq_id)
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
          <!-- イベントの参加効果が不明瞭である以上、イベントに参加しているか否かでイベントの表示色を変えるのはやや -->
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
          @refresh="emit('refresh')"
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
