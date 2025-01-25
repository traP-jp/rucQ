<script setup lang="ts">
import RoomInformationPanel from '@/components/information/RoomInformationPanel.vue'
import PaymentInformationPanel from '@/components/information/PaymentInformationPanel.vue'
import InformationGroupItem from '@/components/information/InformationGroupItem.vue'

const questionGroups: QuestionGroup[] = []
</script>

<template>
  <v-container class="d-flex flex-column ga-4">
    <room-information-panel />
    <payment-information-panel />
    <information-group-item
      v-for="questionGroup in questionGroups"
      :key="questionGroup.id"
      :questionGroup="questionGroup"
    />
  </v-container>
</template>
