<template>
  <mobile-header v-if="xs" title="Guidebook" />

  <div :class="['guidebook-markdown', 'markdown']" v-html="htmlContent"></div>

  <footer class="guidebook-footer">
    <p>© 2024 Summer Camp</p>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'
import { getCamps, getDefalutCamps } from '@/api/handler'

const { xs } = useDisplay()

const markdown = ref(``)
const htmlContent = computed(() => marked(markdown.value))

onMounted(async () => {
  try {
    const response = await getDefalutCamps()
    console.log('API response:', response)

    if (response && typeof response.description === 'string') {
      markdown.value = response.description
    } else {
      console.error('Invalid response format:', response)
    }
  } catch (error) {
    console.error('Failed to fetch camps:', error)
  }
})
</script>

<style>
.guidebook-markdown {
  padding: 30px;
  background-color: var(--color-background); /* 背景色  あとで色はちゃんと設定する*/
  max-width: 1000px;
  height: 100%;
  width: 100%;
  color: #101620;
  line-height: 1.8;
  margin: 0 auto; /* 中央揃え */
  padding: 30px 30px 70px 30px; /* 下にフッターの余白を追加 */
}
</style>
