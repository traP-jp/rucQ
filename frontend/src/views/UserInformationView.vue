<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getQuestionGroups } from '@/api/handler'
import { useDisplay } from 'vuetify'
import MobileHeader from '@/components/layout/MobileHeader.vue'
// import RoomInformationPanel from '@/components/information/RoomInformationPanel.vue'
import PaymentInformationPanel from '@/components/information/PaymentInformationPanel.vue'
import InformationGroupItem from '@/components/information/InformationGroupItem.vue'
const { xs } = useDisplay()

const questionGroups = ref<QuestionGroup[]>([])

// import createClient from 'openapi-fetch'
// import type { paths } from '@/api/schema'

// const client = createClient<paths>({ baseUrl: 'https://rucq.trap.show/api' })

// const { data, error } = await client.GET('/api/me')
// const traqId = data!.traq_id
// const iconUrl = `https://q.trap.jp/api/v3/public/icon/${traqId}`



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
    <!-- <div class="d-flex justify-center align-center">
      <v-avatar v-for="i in 5" :key="i" :size="32">
        <v-img :src="iconUrl" />
      </v-avatar>
      {{ traqId }}
    </div>
    <room-information-panel /> -->
    <payment-information-panel />
    <information-group-item
      v-for="questionGroup in questionGroups"
      :key="questionGroup.id"
      :questionGroup="questionGroup"
    />
  </v-container>
</template>
