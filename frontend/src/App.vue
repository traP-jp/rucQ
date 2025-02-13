<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDisplay } from 'vuetify'
import PageNavigation from '@/components/layout/PageNavigation.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'

const { xs } = useDisplay()
</script>

<template>
  <v-app>
    <mobile-header v-if="xs" />
    <page-navigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
