import { defineStore } from 'pinia'
import { ref } from 'vue'

// ユーザーIDの保存

export const useUserStore = defineStore('user', () => {
  const userId = ref<string | undefined>(undefined)
  return { userId }
})
