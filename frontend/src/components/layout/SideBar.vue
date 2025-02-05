<template>
  <v-navigation-drawer width="230" :mobile-breakpoint="600" app>
    <img src="/logo/logo.svg" alt="rucQ Icon" class="logo" />
    <v-list dense v-model="value" mandatory>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :value="item.value"
        link
        @click="navigateTo(item.value)"
      >
        <div class="header-tab">
          <v-icon class="mr-3">{{ value === item.value ? item.iconActive : item.icon }}</v-icon>
          <!-- 選択中の項目の文字を太くする -->
          <span class="header-title" :class="{ 'header-title-active': value === item.value }">
            {{ item.title }}
          </span>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, watch, onMounted, nextTick } from 'vue'

const router = useRouter()
const route = useRoute()

// URLからアクティブなナビゲーション値を取得する関数
const getActiveValue = () => {
  const segments = route.path.split('/')
  console.log(segments)
  console.log(route.path)
  // 配列に2つ以上ある場合、index 1（例: "/aa/admin" → "admin") を採用
  return segments[2] || 'guidebook'
}

let value = ref<string | null>(null)

// ナビゲーション関数の簡略化
const navigateTo = (path: string) => {
  value.value = path
  if (path === 'guidebook') {
    router.push(`/${route.params.campname}/`)
  } else {
    router.push(`/${route.params.campname}/${path}`)
  }
}

watch(
  () => route.path,
  async () => {
    await nextTick()
    value.value = getActiveValue()
  },
  { immediate: true },
)

const navItems = [
  {
    value: 'guidebook',
    title: '合宿のしおり',
    iconActive: 'mdi-book-open-blank-variant',
    icon: 'mdi-book-open-blank-variant-outline',
  },
  { value: 'schedule', title: 'スケジュール', iconActive: 'mdi-clock', icon: 'mdi-clock-outline' },
  {
    value: 'personal-notes',
    title: 'ノート',
    iconActive: 'mdi-book-edit',
    icon: 'mdi-book-edit-outline',
  },
  { value: 'chat', title: 'チャット', iconActive: 'mdi-chat', icon: 'mdi-chat-outline' },
  { value: 'info', title: '情報', iconActive: 'mdi-information', icon: 'mdi-information-outline' },
  {
    value: 'admin',
    title: '管理者ツール',
    iconActive: 'mdi-account-cog',
    icon: 'mdi-account-cog-outline',
  },
]
</script>

<style scoped>
.header-tab {
  display: flex;
  align-items: center; /* 垂直方向の中央揃え */
  gap: 10px; /* アイコンと文字の間隔 */
  margin-left: 30px;
}

.header-title {
  font-size: 17px; /* テキストサイズを調整 */
  font-weight: normal; /* デフォルトは通常の太さ */
}

.header-title-active {
  font-weight: bold; /* 選択中の文字を太くする */
}

.v-navigation-drawer {
  height: 100vh;
  background-color: var(--color-white) !important;
  border-right: 1.5px solid var(--color-line) !important;
  width: 230px !important;
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: black !important;
}

.logo {
  margin: auto;
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 50%;
}
</style>
