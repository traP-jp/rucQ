<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getQuestionGroups } from '@/api/handler'
import { useDisplay } from 'vuetify'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import RoomInformationPanel from '@/components/information/RoomInformationPanel.vue'
import PaymentInformationPanel from '@/components/information/PaymentInformationPanel.vue'
import InformationGroupItem from '@/components/information/InformationGroupItem.vue'
const { xs } = useDisplay()

const questionGroups = ref<QuestionGroup[]>([])

onMounted(async () => {
  try {
    const response = await getQuestionGroups()
    console.log('API response:', response)
    questionGroups.value = response
  } catch (error) {
    console.error('Failed to fetch question groups:', error)
  }
})
</script>

<template>
  <mobile-header v-if="xs" title="User Information" />
  <v-container class="d-flex flex-column ga-4">
    <!-- <room-information-panel /> -->
    <payment-information-panel />
    <information-group-item
      v-for="questionGroup in questionGroups"
      :key="questionGroup.id"
      :questionGroup="questionGroup"
    />
  </v-container>
</template>
