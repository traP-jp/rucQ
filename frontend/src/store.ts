import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apiClient } from '@/api/apiClient'

// ユーザーIDの保存

export const useUserStore = defineStore('user', () => {
  const userId = ref<string | undefined>(undefined)

  const initUserId = async () => {
    const { data, error } = await apiClient.GET('/api/me')
    if (error) console.error('Failed to initialize user store:', error)
    userId.value = data?.traq_id
  }

  return { initUserId, userId }
})
