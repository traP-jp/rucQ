<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDisplay } from 'vuetify'
import SideBar from '@/components/layout/SideBar.vue'
import MobileFooter from '@/components/layout/MobileFooter.vue'

const { xs } = useDisplay()
</script>

<template>
  <v-app>
    <side-bar />
    <v-main>
      <router-view />
    </v-main>
    <mobile-footer v-if="xs" />
  </v-app>
</template>
