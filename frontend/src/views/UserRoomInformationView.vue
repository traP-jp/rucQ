<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { sampleRooms } from '@/lib/sample-data'
import { apiClient } from '@/api/apiClient'
import type { components } from '@/api/schema'
import UserIcon from '@/components/generic/UserIcon.vue'
import { useCampStore } from '@/store'
import { storeToRefs } from 'pinia'

const { camp } = storeToRefs(useCampStore())

type Floor = {
  id: number
  name: string
  rooms: Room[]
}

type Room = components['schemas']['Room']

const floors = ref<Floor[]>()
const rooms = ref<Room[]>()
// このページの将来的な実装についての提案は用件定義のコメントにまとめました

const getFloors = (rooms: Room[]): Floor[] => {
  if (!rooms.every((room) => /^[0-9]/.test(room.name))) {
    return [{ id: 1, name: 'Rooms', rooms: rooms }]
  }

  const floorNumSet = new Set<number>(Array.from(rooms, (room) => Number(room.name[0])))
  const floors: Floor[] = Array.from(
    [...floorNumSet].sort((a, b) => a - b),
    (num) => ({ id: num, name: `${num}F`, rooms: [] }),
  )
  for (const room of rooms) {
    const index = floors.findIndex((floor) => floor.name === `${room.name[0]}F`)
    floors[index].rooms.push(room)
  }
  return floors
}

onMounted(async () => {
  rooms.value = (await apiClient.GET('/api/rooms')).data!.filter(
    (room) => room.camp_id === camp.value?.id,
  )
  floors.value = getFloors(rooms.value)
})
</script>

<template>
  <div :class="$style.container">
    <div v-for="floor in floors" :key="floor.id">
      <div :class="$style.floorName">
        {{ floor.name }}
      </div>
      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          margin: 8px;
        "
      >
        <v-dialog max-width="400" v-for="room in floor.rooms" :key="room.id">
          <template v-slot:activator="{ props: activatorProps }">
            <v-card elevation="0" color="themePale" class="ma-2 pa-2" v-bind="activatorProps">
              <v-card-title class="text-center pa-0">
                <span style="font-weight: 900; font-size: 20px; color: var(--color-theme)">
                  {{ room.name }}
                </span>
              </v-card-title>
              <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: center">
                <UserIcon
                  v-for="user in room.members"
                  :key="user.traq_id"
                  :id="user.traq_id"
                  :size="30"
                  style="margin: 4px"
                />
              </div>
            </v-card>
          </template>
          <template v-slot:default="{}">
            <v-card color="themePale" class="pa-4">
              <v-card-title class="text-center pa-0">
                <span :class="$style.roomName">
                  {{ room.name.slice(0, -1)
                  }}<span style="font-weight: 900; letter-spacing: 0">{{
                    room.name.slice(-1)
                  }}</span>
                </span>
              </v-card-title>
              <hr
                style="
                  border: none;
                  border-bottom: 1px solid var(--color-theme);
                  margin-bottom: 8px;
                "
              />
              <div
                v-for="user in room.members"
                :key="user.traq_id"
                style="display: flex; align-items: center"
              >
                <UserIcon :id="user.traq_id" :size="30" style="margin: 4px" />
                <div style="margin-left: 4px; font-weight: bold">@{{ user.traq_id }}</div>
              </div>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </div>
  </div>
  <!-- <router-link :class="$style.link" :to="``"> フロアマップを見る </router-link> -->
</template>

<style module>
.container {
  max-width: 800px;
  margin: 16px auto;
}

.floorName {
  width: 200px;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid var(--color-black);
  margin-left: 16px;
}

.link {
  display: block;
  width: 100%;
  text-align: center;
  color: var(--color-theme);
  margin-bottom: 4;
}

.link:hover {
  text-decoration: underline;
}

.roomName {
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 0.5em;
  color: var(--color-theme);
}
</style>
