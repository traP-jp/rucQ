<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDisplay } from 'vuetify'
import SideBar from '@/components/layout/SideBar.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import MobileFooter from '@/components/layout/MobileFooter.vue'

const { xs } = useDisplay()
</script>

<template>
  <v-app style="background: var(--color-background)">
    <side-bar v-if="!xs" />
    <mobile-header v-if="xs" />
    <v-main>
      <router-view />
    </v-main>
    <mobile-footer v-if="xs" />
  </v-app>
</template>
