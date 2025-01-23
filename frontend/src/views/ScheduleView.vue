<script setup lang="ts">
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>ScheduleView
    <mobile-header v-if="mobile" title="Schedule" />
</template>

<style module></style>
