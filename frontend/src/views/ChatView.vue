<script setup lang="ts">
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()
</script>

<template>
  <mobile-header v-if="xs" title="Chat" />
</template>

<style module></style>
