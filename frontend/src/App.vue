<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDisplay } from 'vuetify'
import type { components } from '@/api/schema'
import SideBar from '@/components/layout/SideBar.vue'
import MobileFooter from '@/components/layout/MobileFooter.vue'
import EventPopUp from './components/EventPopUp.vue'

import { ref } from 'vue'
const popUp = ref<components['schemas']['Event'] | undefined>(undefined)
const { xs } = useDisplay()
</script>

<template>
  <v-app style="background: var(--color-background)">
    <side-bar />

    <v-main>
      <router-view v-model:popUp="popUp" />
    </v-main>
    <mobile-footer v-if="xs" />
  </v-app>
  <event-pop-up v-if="popUp" v-model:popUp="popUp" />
  <!-- なんで 1004 なんですか… -->
</template>
