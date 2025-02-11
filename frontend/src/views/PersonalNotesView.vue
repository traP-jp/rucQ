<script setup lang="ts">
import { ref } from 'vue'
import MarkdownPlatform from '@/components/MarkdownPlatform.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const text = ref('')

const isPreview = ref(false)
</script>

<template>
  <mobile-header v-if="xs" title="ユーザー情報" />
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
