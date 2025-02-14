<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const route = useRoute()
const router = useRouter()
const { xs } = useDisplay()

const options = [
  { name: '新規イベント作成', func: () => {} },
  { name: '管理者ツール', func: () => router.push(`/${route.params.campname}/admin`) },
  { name: '別の合宿を表示', func: () => router.push(`/camps`) },
]
</script>

<template>
  <v-app-bar v-if="xs" elevation="2" color="white" density="comfortable">
    <template v-slot:prepend>
      <img src="/icons/icon-transparent.svg" alt="rucQ Icon" :class="$style.icon" />
    </template>

    <v-app-bar-title class="text-orange"
      ><span style="font-weight: bold">{{ route.name }}</span></v-app-bar-title
    >
    <v-menu>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn icon="mdi-dots-horizontal" v-bind="activatorProps" color="orange"></v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(option, i) in options" :key="i" @click="option.func">
          <v-list-item-title>{{ option.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  <div v-if="!xs && route.name === '合宿のしおり'" style="position: absolute; top: 6px; right: 6px">
    <v-menu>
      <template v-slot:activator="{ props: activatorProps }">
        <v-app-bar-nav-icon v-bind="activatorProps" color="orange"></v-app-bar-nav-icon>
      </template>
      <v-list>
        <v-list-item v-for="(option, i) in options" :key="i" @click="option.func">
          <v-list-item-title>{{ option.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style module>
.icon {
  height: 80%;
  margin-right: 6px;
}
</style>
