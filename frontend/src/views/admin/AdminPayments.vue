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

const paymentDataList = ref<PaymentData[]>([])
const selectedId = ref<string | null>(null)
const selectedData = computed(() =>
  paymentDataList.value.find((data) => data.user_id === selectedId.value),
)

const customFilter = (value: string, query: string, item: unknown) => {
  return (item as { raw: PaymentData }).raw.transfer_id.startsWith(query.toUpperCase())
}

const getPaymentDataList = async () => {
  const traqUsersData = await fetch('https://q.trap.jp/api/v3/users') // TODO: rucQのAPIを使う
  if (!traqUsersData.ok) {
    console.error('Failed to fetch users data:', traqUsersData)
    return
  }
  const traqUsers = await traqUsersData.json()
  const res: PaymentData[] = []
  for (const traqUser of traqUsers) {
    const { data, error } = await apiClient.GET('/api/users/{traq_id}/budgets', {
      params: { path: { traq_id: traqUser.name } },
    })
    if (error) {
      console.error('Failed to fetch payment data:', error.message)
      continue
    }
    res.push({
      ...data,
      user_id: traqUser.name,
      transfer_id: traqUser.name.toUpperCase().replace(/[-_]/g, ''),
      avatar: `https://q.trap.jp/api/v3/public/icon/${traqUser.name}`,
    })
  }
  return res
}

const updatePaymentData = async (paymentData?: PaymentData, amount?: number) => {
  const autocomplete = document.querySelector('#input') as HTMLInputElement
  autocomplete.focus()
  selectedId.value = null
  console.log('Updated payment data:', paymentData, amount)

  if (paymentData == null || amount == null) return
  const { error } = await apiClient.PUT('/api/users/{traq_id}/budgets', {
    params: { path: { traq_id: paymentData.user_id } },
    body: {
      camp_id: paymentData.camp_id,
      amount: amount,
      amount_paid: paymentData.amount_paid,
    },
  })
  if (error) {
    console.error('Failed to update payment data:', error.message)
    alert('支払い情報の更新に失敗しました')
  }
}

onMounted(async () => {
  paymentDataList.value = (await getPaymentDataList()) ?? []
})
</script>

<template>
  <mobile-header v-if="xs" title="振込み確認" />
  <v-container class="d-flex justify-center">
    <v-sheet
      class="d-flex flex-column elevation-2 pa-4"
      max-width="800"
      width="100%"
    >
      <v-autocomplete
        v-model="selectedId"
        class="px-4 py-2"
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
          :disabled="selectedData?.amount == null || selectedData.amount_paid === selectedData.amount"
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
    </v-sheet>
  </v-container>
</template>
