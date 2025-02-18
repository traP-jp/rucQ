<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { sampleRooms } from '@/lib/sample-data'
import { apiClient } from '@/api/apiClient'
import UserIcon from '@/components/generic/UserIcon.vue'

type Floor = {
  id: number
  name: string
  rooms: Room[]
}

type Room = {
  id: number
  name: string
  members: string[]
}

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
  //rooms.value = (await apiClient.GET('/api/floors')).data!
  rooms.value = sampleRooms
  floors.value = getFloors(rooms.value)
})
</script>

<template>
  <div style="margin-top: 16px"></div>
  <div v-for="floor in floors" :key="floor.id">
    <div :class="$style.floorName">
      {{ floor.name }}
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; margin: 8px">
      <v-dialog max-width="400" v-for="room in floor.rooms" :key="room.id">
        <template v-slot:activator="{ props: activatorProps }">
          <v-card elevation="0" color="orangePale" class="ma-2 pa-2" v-bind="activatorProps">
            <v-card-title class="text-center pa-0">
              <span style="font-weight: 900; font-size: 20px; color: var(--color-orange)">
                {{ room.name }}
              </span>
            </v-card-title>
            <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: center">
              <UserIcon
                v-for="user in room.members"
                :key="user"
                :id="user"
                :size="30"
                style="margin: 4px"
              />
            </div>
          </v-card>
        </template>
        <template v-slot:default="{}">
          <v-card color="orangePale" class="pa-4">
            <v-card-title class="text-center pa-0">
              <span :class="$style.roomName">
                {{ room.name.slice(0, -1)
                }}<span style="font-weight: 900; letter-spacing: 0">{{ room.name.slice(-1) }}</span>
              </span>
            </v-card-title>
            <hr
              style="border: none; border-bottom: 1px solid var(--color-orange); margin-bottom: 8px"
            />
            <div
              v-for="user in room.members"
              :key="user"
              style="display: flex; align-items: center"
            >
              <UserIcon :id="user" :size="30" style="margin: 4px" />
              <div style="margin-left: 4px; font-weight: bold">@{{ user }}</div>
            </div>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </div>
  <!-- <router-link :class="$style.link" :to="``"> フロアマップを見る </router-link> -->
</template>

<style module>
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
  color: var(--color-orange);
  margin-bottom: 4;
}

.link:hover {
  text-decoration: underline;
}

.roomName {
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 0.5em;
  color: var(--color-orange);
}
</style>
