<script setup lang="ts">
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>PersonalNotesView
    <mobile-header v-if="mobile" title="PersonalNote" />
</template>

<style module></style>
