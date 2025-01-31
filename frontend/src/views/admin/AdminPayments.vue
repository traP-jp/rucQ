<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { components } from '@/api/schema'
import { apiClient } from '@/api/apiClient'
import PaymentInformationPanel from '@/components/information/PaymentInformationPanel.vue'

import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'
const { xs } = useDisplay()

type PaymentData = components['schemas']['Budget'] & {
  user_id: string
  transfer_id: string
  avatar: string
}
const autocompleteRef = ref()
const paymentDataList = ref<PaymentData[]>([])
const selectedId = ref<string | null>(null)
const selectedData = computed(() =>
  paymentDataList.value.find((data) => data.user_id === selectedId.value),
)

const customFilter = (value: string, query: string, item: unknown) => {
  return (item as { raw: PaymentData }).raw.transfer_id.startsWith(query.toUpperCase())
}

// const getUserList = async () => []

const getPaymentDataList = async (userList: string[]) => {
  const res: PaymentData[] = []
  for (const userId of userList) {
    const { data, error } = await apiClient.GET('/api/users/{traq_id}/budgets', {
      params: { path: { traq_id: userId } },
    })
    if (error) {
      console.error('Failed to fetch payment data:', error.message)
      continue
    }
    res.push({
      ...data,
      user_id: userId,
      transfer_id: userId.toUpperCase().replace(/[-_]/g, ''),
      avatar: `https://q.trap.jp/api/v3/public/icon/${userId}`,
    })
  }
  return res
}

const updatePaymentData = async (paymentData?: PaymentData, amount?: number) => {
  if (paymentData == null || amount == null) return
  const { error } = await apiClient.PUT('/api/users/{traq_id}/budgets', {
    params: { path: { traq_id: paymentData.user_id } },
    body: {
      camp_id: paymentData.camp_id,
      amount: paymentData.amount,
      amount_paid: amount,
    },
  })
  if (error) {
    console.error('Failed to update payment data:', error.message)
    alert('支払い情報の更新に失敗しました')
  } else {
    selectedId.value = null
    autocompleteRef.value?.focus()
  }
}

// onMounted(async () => {
//   const userList = (await getUserList()) ?? []
//   paymentDataList.value = (await getPaymentDataList(userList)) ?? []
// })

// 一時的な処置
const userListStr = ref('')
const setupUserList = async () => {
  const userList = userListStr.value.split(' ')
  paymentDataList.value = (await getPaymentDataList(userList)) ?? []
}
</script>

<template>
  <mobile-header v-if="xs" title="振込み確認" />
  <v-container class="d-flex justify-center">
    <v-sheet class="d-flex flex-column elevation-2 pa-4" max-width="800" width="100%">
      <v-autocomplete
        v-model="selectedId"
        class="px-4 py-2"
        ref="autocompleteRef"
        :items="paymentDataList"
        item-title="user_id"
        item-value="user_id"
        label="振込名義ID"
        :custom-filter="customFilter"
        auto-select-first
        hide-details
      >
        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :prepend-avatar="item.raw.avatar"
            :title="item.raw.transfer_id"
          />
        </template>
      </v-autocomplete>
      <v-card-item
        :title="selectedData?.user_id ?? 'traQ ID'"
        :prepend-avatar="selectedData?.avatar ?? 'https://q.trap.jp/api/v3/public/icon/traP'"
      />
      <v-card-text>
        <payment-information-panel :data="selectedData" />
      </v-card-text>
      <div class="d-flex align-center justify-center ga-4 px-4">
        <v-btn
          class="flex-grow-1 bg-green-lighten-2"
          :disabled="
            selectedData?.amount == null || selectedData.amount_paid === selectedData.amount
          "
          @click="updatePaymentData(selectedData, selectedData?.amount ?? undefined)"
        >
          振込確認
        </v-btn>
        <v-btn
          class="flex-grow-1 bg-red-lighten-3"
          :disabled="selectedData?.amount == null"
          @click="updatePaymentData"
        >
          拒否
        </v-btn>
      </div>
      <!-- 一時的な処置 -->
      <v-sheet class="d-flex flex-column pa-4">
        <v-text-field
          v-model="userListStr"
          label="traQ ID"
          placeholder="traQ IDをスペース区切りで入力"
        />
        <v-btn @click="setupUserList">セットアップ</v-btn>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>
