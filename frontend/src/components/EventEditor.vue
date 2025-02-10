<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownEditor from './MarkdownEditor.vue'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
const props = defineProps<{
  event: CampEvent
}>()

const text = ref('')

onMounted(() => {
  text.value = props.event.description
})
</script>

<template>
  <div :class="$style.container">
    <v-card rounded="0" elevation="0" :class="[$style.card, `bg-${event.display_color}`]">
      <v-time-picker format="ampm" landscape scrollable></v-time-picker>
    </v-card>
    <MarkdownEditor :isPreviewable="true" v-model:text="text" />
  </div>
</template>

<style module>
.container {
  height: 100%;
}

.card {
  height: fit-content;
  margin: auto 0;
}
</style>
