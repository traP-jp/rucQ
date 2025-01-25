<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute() // 追加
const value = ref<string>('guidebook')

watch(value, (val: string) => {
  switch (val) {
    case 'guidebook':
      const segments = route.path.split('/')
      const parentPath = '/' + segments[1] + '/' 
      router.push(parentPath)
      break
    case 'schedule':
      router.push('schedule')
      break
    case 'notes':
      router.push('notes')
      break
    case 'chat':
      router.push('chat')
      break
    case 'info':
      router.push('info')
      break
  }
})
</script>

<template>
  <v-bottom-navigation v-model="value" color="primary">
    <v-btn value="guidebook">
      <v-icon>mdi-book-open</v-icon>
    </v-btn>

    <v-btn value="schedule">
      <v-icon>mdi-calendar</v-icon>
    </v-btn>

    <v-btn value="notes">
      <v-icon>mdi-notebook</v-icon>
    </v-btn>

    <v-btn value="chat">
      <v-icon>mdi-chat</v-icon>
    </v-btn>

    <v-btn value="info">
      <v-icon>mdi-information</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<style module></style>
