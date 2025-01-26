<script setup lang="ts">
const isPreview = defineModel<boolean>('isPreview')
</script>

<template>
  <button v-if="!isPreview" @click="isPreview = true">
    <v-icon icon="mdi-eye-outline" :class="$style.icon"></v-icon>
  </button>
  <button v-else @click="isPreview = false">
    <v-icon icon="mdi-square-edit-outline" :class="$style.icon"></v-icon>
  </button>
</template>

<style module>
.icon {
  font-size: 24px;
}
</style>
