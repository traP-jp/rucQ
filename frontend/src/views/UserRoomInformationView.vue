<script setup lang="ts">
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()
</script>

<template>
  <mobile-header v-if="xs" title="部屋割り一覧" />
  <h1>今後開発予定！！！！！！！</h1>
</template>

<style></style>
