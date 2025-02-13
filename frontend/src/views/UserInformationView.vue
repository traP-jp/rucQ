<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { components } from '@/api/schema'
import { apiClient } from '@/api/apiClient'
import { useUserStore } from '@/store'
// import RoomInformationPanel from '@/components/information/RoomInformationPanel.vue'
import PaymentInformationPanel from '@/components/information/PaymentInformationPanel.vue'
import InformationGroupItem from '@/components/information/InformationGroupItem.vue'

import { useDisplay } from 'vuetify'
const { xs } = useDisplay()

const userId = ref<string>()
// const roomData = ref()
const paymentData = ref<components['schemas']['Budget']>()
const questionGroups = ref<components['schemas']['QuestionGroup'][]>([])

const getPaymentData = async () => {
  const { data, error } = await apiClient.GET('/api/me/budgets')
  if (error) console.error('Failed to fetch payment data:', error.message)
  return data
}

const getInformationGroups = async () => {
  const { data, error } = await apiClient.GET('/api/question_groups')
  if (error) console.error('Failed to fetch information groups:', error.message)
  return data
}

onMounted(async () => {
  userId.value = await useUserStore().getUserId()
  paymentData.value = await getPaymentData()
  questionGroups.value = (await getInformationGroups()) ?? []
})
</script>

<template>
  <v-container v-if="xs" class="d-flex flex-column ga-4">
    <payment-information-panel :data="paymentData" />
    <information-group-item
      v-for="questionGroup in questionGroups"
      :key="questionGroup.id"
      :questionGroup="questionGroup"
    />
  </v-container>

  <v-container v-else class="d-flex flex-column align-center ga-4">
    <v-sheet class="d-flex flex-column elevation-2 px-8 py-4" max-width="800" width="100%">
      <v-card-item
        class="px-0"
        :title="userId ?? 'unknown'"
        :prepend-avatar="`https://q.trap.jp/api/v3/public/icon/${userId ?? 'traP'}`"
      />
      <v-container class="d-flex flex-column ga-4 pa-0">
        <payment-information-panel :data="paymentData" />
        <information-group-item
          v-for="questionGroup in questionGroups"
          :key="questionGroup.id"
          :questionGroup="questionGroup"
        />
      </v-container>
    </v-sheet>
  </v-container>
</template>
