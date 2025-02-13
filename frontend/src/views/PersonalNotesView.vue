<script setup lang="ts">
import { ref } from 'vue'
import MarkdownPlatform from '@/components/markdown/MarkdownPlatform.vue'

const text = ref('')

const isPreview = ref(false)
</script>

<template>
  <div :class="$style.container">
    <MarkdownPlatform
      v-model:isPreview="isPreview"
      v-model:text="text"
      color="orange"
    ></MarkdownPlatform>
  </div>
</template>

<style module>
.container {
  position: relative;
  height: 100%;
}

.button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
