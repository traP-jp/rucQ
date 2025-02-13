<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <v-app-bar elevation="2" color="white" density="comfortable">
    <template v-slot:prepend>
      <img src="/icons/icon-transparent.svg" alt="rucQ Icon" :class="$style.icon" />
    </template>

    <v-app-bar-title class="text-orange"
      ><span style="font-weight: bold">{{ route.name }}</span></v-app-bar-title
    >
    <v-app-bar-nav-icon color="orange"></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<style module>
.icon {
  height: 80%;
  margin-right: 6px;
}
</style>
