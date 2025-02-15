<template>
  <MarkdownPreview :isEditable="false" v-model:text="text" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiClient } from '@/api/apiClient'
import MarkdownPreview from '@/components/markdown/MarkdownPreview.vue'

const text = ref('')

onMounted(async () => {
  try {
    const { data } = await apiClient.GET('/api/camps/default')
    console.log('API response:', data)

    if (data && typeof data.description === 'string') {
      text.value = data.description
    } else {
      console.error('Invalid response format:', data)
    }
  } catch (error) {
    console.error('Failed to fetch camps:', error)
  }
})
</script>

<style module></style>
