<script setup lang="ts">
import { ref } from 'vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import MarkdownPreview from '@/components/MarkdownPreview.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const text = ref('')

const isPreview = ref(false)
</script>

<template>
  <mobile-header v-if="xs" title="ユーザー情報" />
  <div :class="$style.container">
    <div style="width: 100%; height: 100%">
      <div style="width: 100%; height: 100%; position: absolute">
        <MarkdownEditor v-model:text="text" v-model:isPreview="isPreview" v-if="!isPreview">
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
        <MarkdownPreview
          v-else
          v-model:text="text"
          v-model:isPreview="isPreview"
          style="height: 100%; width: 100%; padding: 0 8px"
        >
          <div :class="$style.button">
            <v-btn
              @click="isPreview = false"
              density="comfortable"
              icon="mdi-square-edit-outline"
              baseColor="white"
              class="text-primary"
            ></v-btn>
          </div>
        </MarkdownPreview>
      </div>
    </div>
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
