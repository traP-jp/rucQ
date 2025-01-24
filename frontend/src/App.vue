<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDisplay } from 'vuetify'
import SideBar from '@/components/layout/SideBar.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import MobileFooter from '@/components/layout/MobileFooter.vue'

const { mobile } = useDisplay()
</script>

<template>
  <v-app>
    <side-bar v-if="!mobile" />
    <mobile-header v-if="mobile" />
    <v-main>
      <router-view />
    </v-main>
    <mobile-footer v-if="mobile" />
  </v-app>
</template>
