<script setup lang="ts">
import UserInformationText from '@/components/information/UserInformationText.vue'
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.profileContainer">
      <img :class="$style.userIcon" :src="'https://q.trap.jp/api/v3/public/icon/ogu_kazemiya'" />
      <div :class="$style.nameContainer">ogu_kazemiya</div>
    </div>
    <div :class="$style.informationContainer">
      <div :class="$style.divider">public</div>
      <user-information-text />
      <div :class="$style.divider">private</div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-primary);
  min-height: 100%;
  width: 100%;
  padding: 8px;
}

.profileContainer {
  display: flex;
  padding: 32px 48px;
  gap: 24px;
  border-bottom: 2px solid var(--color-ui-tertiary);
}

.userIcon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.nameContainer {
  display: flex;
  align-items: center;
  font-size: 24px;
}

.informationContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
}

.divider {
  font-size: 15px;
  color: var(--color-ui-primary);
}
</style>
