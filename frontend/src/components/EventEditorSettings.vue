<script setup lang="ts">
import { VTimePicker } from 'vuetify/labs/VTimePicker'
const title = defineModel<string>('title')
const place = defineModel<string>('place')
const day = defineModel<string>('day')
const startTime = defineModel<string>('startTime')
const endTime = defineModel<string>('endTime')
const color = defineModel<string>('color')
</script>

<template>
  <v-text-field
    :autofocus="true"
    v-model="title"
    :rules="[(v) => !!v || '']"
    label="タイトル"
    variant="underlined"
    required
    :class="$style.titleInput"
  ></v-text-field>

  <v-text-field
    v-model="place"
    :rules="[(v) => !!v || '']"
    label="場所"
    prepend-inner-icon="mdi-map-marker-outline"
    variant="underlined"
    required
  ></v-text-field>
  <v-select
    v-model="day"
    :items="['1日目 (9/10)', '2日目 (9/11)', '3日目 (9/12)']"
    :rules="[(v) => !!v || '']"
    label="開催日"
    prepend-inner-icon="mdi-calendar-blank"
    variant="underlined"
    required
  ></v-select>

  <div style="display: flex">
    <v-dialog ref="dialog" :v-model:propName="startTime">
      <template v-slot:activator="{ props: activatorProps }">
        <v-text-field
          v-model="startTime"
          label="開始時刻"
          prepend-inner-icon="mdi-clock-time-four-outline"
          variant="underlined"
          readonly
          v-bind="activatorProps"
          style="margin-right: 10px"
        ></v-text-field>
      </template>
      <template v-slot:default="{ isActive }">
        <v-sheet width="fit-content" style="margin: 0 auto">
          <v-time-picker format="24hr" :color="color" v-model="startTime" title="開始時刻を設定" />
          <v-btn
            @click="isActive.value = false"
            elevation="0"
            rounded="0"
            width="100%"
            :color="color"
            size="large"
          >
            <span style="font-weight: bold">OK</span>
          </v-btn>
        </v-sheet>
      </template>
    </v-dialog>
    <v-dialog ref="dialog" :v-model:propName="endTime">
      <template v-slot:activator="{ props: activatorProps }">
        <v-text-field
          v-model="endTime"
          label="終了時刻"
          prepend-inner-icon="mdi-clock-time-four-outline"
          variant="underlined"
          readonly
          v-bind="activatorProps"
          style="margin-left: 10px"
        ></v-text-field>
      </template>
      <template v-slot:default="{ isActive }">
        <v-sheet width="fit-content" style="margin: 0 auto">
          <v-time-picker format="24hr" :color="color" v-model="endTime" title="終了時刻を設定" />
          <v-btn
            @click="isActive.value = false"
            elevation="0"
            rounded="0"
            width="100%"
            :color="color"
            size="large"
          >
            <span style="font-weight: bold">OK</span>
          </v-btn>
        </v-sheet>
      </template>
    </v-dialog>
  </div>

  <v-item-group v-model="color" class="d-flex justify-center" width="100%">
    <v-item v-for="(myColor, i) in ['orange', 'green', 'red', 'blue', 'purple', 'pink']" :key="i">
      <template v-slot:default="{}">
        <v-btn
          :active="color === myColor"
          :icon="`mdi-numeric-${i + 1}`"
          :color="myColor"
          height="40"
          :ripple="false"
          :variant="color === myColor ? 'elevated' : 'tonal'"
          width="40"
          style="margin: 6px"
          elevation="0"
          @click="color = myColor"
        ></v-btn>
      </template>
    </v-item>
  </v-item-group>
</template>

<style module>
.titleInput :global(input) {
  font-size: 20px !important;
}
</style>
