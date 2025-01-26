<template>
  <v-bottom-navigation color="primary" mandatory grow v-model="value">
    <v-btn
      v-for="item in navItems"
      :key="item.value"
      @click="navigateTo(item.value)"
      :value="item.value"
    >
      <v-icon size="24">{{ value === item.value ? item.iconActive : item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// ナビゲーションバインディング
const value = ref<string>('guidebook')

// ナビゲーション関数
const navigateTo = (path: string) => {
  const segments = route.path.split('/')
  value.value = path
  if (path == 'guidebook') {
    router.push(`/${segments[1]}`)
  } else {
    router.push(`/${segments[1]}/${path}`)
  }
}

// ナビゲーションアイテムのリスト
const navItems = [
  {
    value: 'guidebook',
    title: '合宿のしおり',
    iconActive: 'mdi-book-open-blank-variant',
    icon: 'mdi-book-open-blank-variant-outline',
  },
  {
    value: 'schedule',
    title: 'スケジュール',
    iconActive: 'mdi-clock',
    icon: 'mdi-clock-outline',
  },
  {
    value: 'personal-notes',
    title: 'ノート',
    iconActive: 'mdi-book-edit',
    icon: 'mdi-book-edit-outline',
  },
  {
    value: 'chat',
    title: 'チャット',
    iconActive: 'mdi-chat',
    icon: 'mdi-chat-outline',
  },
  {
    value: 'info',
    title: '情報',
    iconActive: 'mdi-information',
    icon: 'mdi-information-outline',
  },
]
</script>

<style scoped>
/* スタイルは必要に応じて調整 */
.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
