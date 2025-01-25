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
  <v-bottom-navigation v-model="value" color="primary" mandatory >
    <v-btn value="guidebook">
      <v-icon>{{ value === 'guidebook' ? 'mdi-book-open-blank-variant' : 'mdi-book-open-blank-variant-outline' }}</v-icon>

    </v-btn>

    <v-btn value="schedule">
      <v-icon>{{ value === 'schedule' ? 'mdi-clock' : 'mdi-clock-outline' }}</v-icon>
    </v-btn>

    <v-btn value="notes">
      <v-icon>{{ value === 'notes' ? 'mdi-book-edit' : 'mdi-book-edit-outline' }}</v-icon>
    </v-btn>

    <v-btn value="chat">
      <v-icon>{{ value ==='chat' ? 'mdi-chat' : 'mdi-chat-outline' }}</v-icon>
    </v-btn>

    <v-btn value="info">
      <v-icon>{{ value === 'info' ? 'mdi-information' : 'mdi-information-outline' }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<style module></style>
