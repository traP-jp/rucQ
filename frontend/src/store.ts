import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { components } from '@/api/schema'
import { apiClient } from '@/api/apiClient'

type Camp = components['schemas']['Camp'] & { start_date: string; end_date: string }

// ユーザーIDの保存

export const useUserStore = defineStore('user', () => {
  const userId = ref<string | undefined>(undefined)

  const initUserId = async () => {
    const { data, error } = await apiClient.GET('/api/me')
    if (error) console.error('Failed to initialize user store:', error)
    // rucQ にアクセスして一番にエラーが出るとすればここなので、エラーメッセージの出力は重要かも
    console.log(data)
    userId.value = data?.traq_id
  }

  return { initUserId, userId }
})

// 表示する合宿の情報
// pinia のデフォルト設定では、この形式で定義された情報はページを開いている間だけ保存される

export const useCampStore = defineStore('camp', () => {
  const camp = ref<Camp | undefined>(undefined)

  const initCamp = async (id?: number) => {
    if (id === undefined) {
      camp.value = {
        ...(await apiClient.GET('/api/camps/default')).data!,
        start_date: '2025-02-20T00:00:00.000000+09:00', // 取り急ぎ冬合宿の日程
        end_date: '2025-02-22T00:00:00.000000+09:00',
      }
    } else {
      camp.value = {
        ...(
          await apiClient.GET('/api/camps/{camp_id}', {
            params: { path: { camp_id: id } },
          })
        ).data!,
        start_date: '2025-02-20T00:00:00.000000+09:00',
        end_date: '2025-02-22T00:00:00.000000+09:00',
      }
    }
    console.log(camp.value)
  }

  return { camp, initCamp }
})
