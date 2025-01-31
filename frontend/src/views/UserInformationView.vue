<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { components } from '@/api/schema'
import { apiClient } from '@/api/apiClient'
// import RoomInformationPanel from '@/components/information/RoomInformationPanel.vue'
import PaymentInformationPanel from '@/components/information/PaymentInformationPanel.vue'
import InformationGroupItem from '@/components/information/InformationGroupItem.vue'

import MobileHeader from '@/components/layout/MobileHeader.vue'
import { useDisplay } from 'vuetify'
const { xs } = useDisplay()

// const roomData = ref()
const paymentData = ref<components['schemas']['Budget']>()
const questionGroups = ref()

const getPaymentData = async () => {
  const { data, error } = await apiClient.GET('/api/me/budgets')
  if (error) console.error('Failed to fetch payment data:', error.message)
  return data
}

const getInformationGroups = async () => {
  const { data, error } = await apiClient.GET('/api/question_groups')
  if (error) {
    console.error('Failed to fetch information groups:', error.message)
    return []
  }
  return data
}

onMounted(async () => {
  paymentData.value = await getPaymentData()
  questionGroups.value = await getInformationGroups()
})
</script>

<template>
  <mobile-header v-if="xs" title="ユーザー情報" />
  <v-container v-if="xs" class="d-flex flex-column ga-4">
    <payment-information-panel :data="paymentData" />
    <information-group-item
      v-for="questionGroup in questionGroups"
      :key="questionGroup.id"
      :questionGroup="questionGroup"
    />
  </v-container>

  <v-container v-else class="d-flex justify-center">
    <v-sheet class="d-flex flex-column ga-4 elevation-2 pa-4" max-width="800" width="100%">
      <payment-information-panel :data="paymentData" />
      <information-group-item
        v-for="questionGroup in questionGroups"
        :key="questionGroup.id"
        :questionGroup="questionGroup"
      />
    </v-sheet>
  </v-container>
</template>
