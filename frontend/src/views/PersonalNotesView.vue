<script setup lang="ts">
import { ref } from 'vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import MarkdownPreview from '@/components/MarkdownPreview.vue'
import EditPreviewButton from '@/components/EditPreviewButton.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const text = ref('')

const isPreview = ref(false)
</script>

<template>
  <mobile-header v-if="xs" title="PersonalNote" />
  <div :class="$style.container">
    <MarkdownEditor v-if="!isPreview" v-model:text="text" />
    <MarkdownPreview v-else v-model:text="text" />
    <EditPreviewButton :class="$style.button" v-model:isPreview="isPreview" />
  </div>
</template>

<style module>
.container {
  position: relative;
  height: 100%;
}

.button {
  position: absolute;
  top: 12px;
  right: 12px;
}
</style>
