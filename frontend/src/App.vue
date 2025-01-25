<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDisplay } from 'vuetify'
import SideBar from '@/components/layout/SideBar.vue'
import MobileFooter from '@/components/layout/MobileFooter.vue'

//初期のページタイトルを定義

const { xs } = useDisplay()
</script>

<template>
  <v-app style="background: var(--color-background)">
    <side-bar />
    <mobile-header v-if="xs" />

    <v-main>
      <router-view />
    </v-main>
    <mobile-footer v-if="xs" />
  </v-app>
</template>
