<script setup lang="ts">
import { computed } from 'vue'
import type { components } from '@/api/schema'

const props = defineProps<{
  data?: components['schemas']['Budget']
}>()

const status = computed(() => {
  if (props.data?.amount == null) return 'none'
  return props.data.amount === props.data.amount_paid ? 'paid' : 'unpaid'
})

const billing = computed(() => props.data?.amount ?? 0)
const paid = computed(() => props.data?.amount_paid ?? 0)
</script>

<template>
  <v-card v-if="status === 'paid'" class="bg-green-lighten-4 text-green-darken-3 pa-4">
    <v-card-title class="text-center text-h4 pa-0"> ¥{{ billing }} </v-card-title>
    <v-card-text class="text-center pa-0">支払いが完了しています</v-card-text>
  </v-card>

  <v-card v-if="status === 'unpaid'" class="bg-red-lighten-4 text-red-accent-3 pa-4">
    <v-card-title class="text-center text-h4 pa-0"> ¥{{ billing }} </v-card-title>
    <v-card-text class="text-center pa-0">
      {{ paid > 0 ? `¥${paid}が支払い済み` : '支払いが完了していません' }}
    </v-card-text>
  </v-card>

  <v-card v-if="status === 'none'" class="bg-grey-lighten-4 text-grey-accent-3 pa-4">
    <v-card-title class="text-center text-h4 pa-0">情報がありません</v-card-title>
    <v-card-text class="text-center pa-0">合宿費情報が登録されていません</v-card-text>
  </v-card>
</template>
