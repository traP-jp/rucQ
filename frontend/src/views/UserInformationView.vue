<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { components } from '@/api/schema'
import { apiClient } from '@/api/apiClient'
import { useUserStore } from '@/store'
// import RoomInformationPanel from '@/components/information/RoomInformationPanel.vue'
import PaymentInformationPanel from '@/components/information/PaymentInformationPanel.vue'
import InformationGroupItem from '@/components/information/InformationGroupItem.vue'

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
  userId.value = useUserStore().userId
  paymentData.value = await getPaymentData()
  questionGroups.value = (await getInformationGroups()) ?? []
})
</script>

<template>
  <div :class="$style.container">
    <payment-information-panel :data="paymentData" />
    <information-group-item
      v-for="questionGroup in questionGroups"
      :key="questionGroup.id"
      :questionGroup="questionGroup"
    />
  </div>
</template>

<style module>
.container {
  height: 100%;
  width: 100%;
  margin: auto;
  max-width: 600px;
}
</style>
