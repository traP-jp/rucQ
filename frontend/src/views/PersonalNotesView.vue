<script setup lang="ts">
import { ref } from 'vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import MarkdownPreview from '@/components/MarkdownPreview.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import ScrollableContent from '@/components/Generic/ScrollableContent.vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const text = ref('')

const isPreview = ref(false)
</script>

<template>
  <mobile-header v-if="xs" title="ユーザー情報" />
  <div :class="$style.container">
    <div style="width: 100%; height: 100%" v-if="!isPreview">
      <div style="width: 100%; height: 100%; position: absolute">
        <MarkdownEditor
          v-model:text="text"
          v-model:isPreview="isPreview"
          style="background-color: var(--color-white)"
        >
          <v-btn
            @click="isPreview = true"
            density="comfortable"
            elevation="0"
            icon="mdi-eye-outline"
            baseColor="transparent"
            class="text-primary"
            style="margin-bottom: 10px"
          ></v-btn>
        </MarkdownEditor>
      </div>
    </div>
    <div style="height: 100%" v-else>
      <ScrollableContent>
        <MarkdownPreview v-model:text="text" v-model:isPreview="isPreview" style="padding: 10px" />
      </ScrollableContent>
      <div :class="$style.button">
        <v-btn
          @click="isPreview = false"
          density="comfortable"
          icon="mdi-square-edit-outline"
          baseColor="white"
          class="text-primary"
        ></v-btn>
      </div>
    </div>
    <!-- <EditPreviewButton :class="$style.button" v-model:isPreview="isPreview" /> -->
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
  right: 6px;
}
</style>
