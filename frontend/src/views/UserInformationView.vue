<script setup lang="ts">
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { ref } from 'vue'
import UserInformationItem from '@/components/UserInformationItem.vue'
import { useDisplay } from 'vuetify'

const editMode = ref(true)

const { mobile } = useDisplay()
</script>

<template>
  <mobile-header v-if="mobile" title="UserInformation" />
  <div :class="$style.container">
    <div :class="$style.profileContainer">
      <img :class="$style.userIcon" :src="'https://q.trap.jp/api/v3/public/icon/ogu_kazemiya'" />
      <div :class="$style.nameContainer">ogu_kazemiya</div>
    </div>
    <div :class="$style.informationContainer">
      <div :class="$style.informationSection">
        <div :class="$style.divider">public</div>
        <user-information-item :class="$style.information" :edit-mode="editMode" type="select" />
      </div>
      <div :class="$style.informationSection">
        <div :class="$style.divider">private</div>
        <user-information-item :class="$style.information" :edit-mode="editMode" type="number" />
        <user-information-item :class="$style.information" :edit-mode="editMode" type="text" />
      </div>
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
}

.informationSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
}

.divider {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 16px;
  color: var(--color-ui-secondary);
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--color-ui-secondary);
  margin: 0 8px;
}

.information {
  width: 100%;
  padding: 8px 16px;
}
</style>
