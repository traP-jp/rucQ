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
  <v-card v-if="status === 'paid'" color="greenPale" class="ma-4 pa-4">
    <v-card-title class="text-center pa-0">
      <span style="font-weight: 900; font-size: 24px; color: var(--color-green)">
        {{ billing.toLocaleString() }} 円
      </span>
    </v-card-title>
    <v-card-text class="text-center pa-0">
      <span style="font-weight: bold; color: var(--color-green)"> 支払いが完了しています </span>
    </v-card-text>
  </v-card>

  <v-card elevation="0" v-if="status === 'unpaid'" color="redPale" class="ma-4 pa-4">
    <v-card-title class="text-center pa-0">
      <span style="font-weight: 900; font-size: 24px; color: var(--color-red)">
        {{ billing.toLocaleString() }} 円
      </span>
    </v-card-title>
    <v-card-text class="text-center pa-0">
      <span style="font-weight: bold; color: var(--color-red)">
        {{ paid > 0 ? `${paid.toLocaleString()} 円が支払い済み` : '支払いが完了していません' }}
      </span>
    </v-card-text>
  </v-card>

  <v-card v-if="status === 'none'" class="bg-grey-lighten-4 text-grey-darken-3 pa-4">
    <v-card-title class="text-center pa-0">未登録</v-card-title>
    <v-card-text class="text-center pa-0">合宿費情報が登録されていません</v-card-text>
  </v-card>
</template>
