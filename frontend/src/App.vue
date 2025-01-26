<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDisplay } from 'vuetify'
import SideBar from '@/components/layout/SideBar.vue'
import MobileFooter from '@/components/layout/MobileFooter.vue'
import EventPopUp from './components/EventPopUp.vue'

import { ref } from 'vue'
const popUp = ref(1)

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
  <event-pop-up v-if="popUp !== 0" v-model:popUp="popUp" />
  <!-- なんで 1004 なんですか… -->
</template>
