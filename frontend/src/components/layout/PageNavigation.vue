<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()
const router = useRouter()
const route = useRoute()

const navItems = [
  {
    path: '',
    title: '合宿のしおり',
    iconActive: 'mdi-book-open-blank-variant',
    icon: 'mdi-book-open-blank-variant-outline',
  },
  {
    path: 'schedule',
    title: 'スケジュール',
    iconActive: 'mdi-clock',
    icon: 'mdi-clock-outline',
  },
  {
    path: 'personal-notes',
    title: 'ノート',
    iconActive: 'mdi-book-edit',
    icon: 'mdi-book-edit-outline',
  },
  {
    path: 'chat',
    title: 'チャット',
    iconActive: 'mdi-chat',
    icon: 'mdi-chat-outline',
  },
  {
    path: 'info',
    title: 'ユーザー情報',
    iconActive: 'mdi-information',
    icon: 'mdi-information-outline',
  },
  {
    path: 'admin',
    title: '管理者ツール',
    iconActive: 'mdi-account-cog',
    icon: 'mdi-account-cog-outline',
  },
]
</script>

<template>
  <v-bottom-navigation v-if="xs" color="primary" mandatory grow>
    <v-btn
      v-for="item in navItems"
      :key="item.title"
      @click="router.push(`/${route.params.campname}/${item.path}`)"
    >
      <v-icon size="24">{{ route.name === item.title ? item.iconActive : item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
  <v-navigation-drawer
    width="230"
    :mobile-breakpoint="600"
    style="z-index: 1; border-right: 1.5px solid var(--color-line) !important"
    app
  >
    <img src="/logo/logo.svg" alt="rucQ Icon" :class="$style.logo" />
    <v-list dense mandatory>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        @click="router.push(`/${route.params.campname}/${item.path}`)"
      >
        <div :class="$style.headerTab">
          <v-icon class="mr-3">{{
            route.name === item.title ? item.iconActive : item.icon
          }}</v-icon>
          <span
            :class="[
              [$style.headerTitle],
              { [$style.headerTitleActive]: route.name === item.title },
            ]"
          >
            {{ item.title }}
          </span>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style module>
.headerTab {
  display: flex;
  align-items: center; /* 垂直方向の中央揃え */
  gap: 10px; /* アイコンと文字の間隔 */
  margin-left: 30px;
}

.headerTitle {
  font-size: 17px; /* テキストサイズを調整 */
  font-weight: normal; /* デフォルトは通常の太さ */
}

.headerTitleActive {
  font-weight: bold; /* 選択中の文字を太くする */
}

.logo {
  margin: auto;
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 50%;
}
</style>
