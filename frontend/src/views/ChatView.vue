<script setup lang="ts">
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
    <mobile-header v-if="mobile" title="Chat" />
</template>

<style module></style>
