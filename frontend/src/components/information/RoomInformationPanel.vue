<script setup lang="ts">
import { sampleRooms } from '@/lib/sample-data'
import UserIcon from '@/components/generic/UserIcon.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <v-card elevation="0" color="orangePale" class="mx-4 mt-4 pa-4">
    <v-card-title class="text-center pa-0">
      <span :class="$style.roomName">
        {{ sampleRooms[0].name.slice(0, -1)
        }}<span style="font-weight: 900; letter-spacing: 0">{{
          sampleRooms[0].name.slice(-1)
        }}</span>
      </span>
    </v-card-title>
    <div style="width: 100%; display: flex; justify-content: center">
      <UserIcon
        v-for="user in sampleRooms[0].members"
        :key="user"
        :id="user"
        :size="30"
        style="margin: 4px"
      />
    </div>
  </v-card>
  <router-link :class="$style.link" :to="`/${route.params.campname}/info/users`">
    合宿メンバーの部屋一覧
  </router-link>
</template>

<style module>
.roomName {
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 0.5em;
  color: var(--color-orange);
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
</style>
