<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  editMode: boolean
  type: 'text' | 'number' | 'select'
}>()

const textValue = ref('まんじゅう')
const numberValue = ref(998244353)
const selectValue = ref('')
const selectNo = ref(false)
const isNumber = ref(true) // 適切に判定する

const value = computed(() => {
  switch (props.type) {
    case 'text':
      if (selectNo.value) return ''
      if (textValue.value === '') return undefined
      return textValue.value
    case 'number':
      if (!isNumber.value) return undefined
      return numberValue.value
    case 'select':
      if (selectValue.value === '') return undefined
      return selectValue.value
    default:
      const _exhaustiveCheck: never = props.type
      return _exhaustiveCheck
  }
})
</script>

<template>
  <div :class="$style.container">
    <div v-if="!props.editMode" :class="$style.display">
      <div :class="$style.information">
        <div :class="$style.label">アレルギー</div>
        <div :class="$style.value">{{ value??'' }}</div>
      </div>
      <span :class="$style.description">
        12/28まで アレルギー情報を入力してください
      </span>
    </div>

    <div v-if="props.editMode && props.type === 'text'" :class="$style.textEdit">
      <v-text-field
        v-model="textValue"
        :disabled="selectNo"
        clearable
        label="アレルギー"
        hint="12/28まで アレルギー情報を入力してください"
        persistent-hint
      />
      <div :class="$style.checkboxContainer">
        <label :class="$style.checkboxLabel">なし</label>
        <v-checkbox-btn v-model="selectNo" :class="$style.checkbox"></v-checkbox-btn>
      </div>
    </div>

    <div v-if="props.editMode && props.type === 'number'" :class="$style.numberEdit">
      <v-text-field
        v-model="numberValue"
        clearable
        label="身長"
        hint="1/5まで 単位はcmです"
        persistent-hint
      />
    </div>

    <div v-if="props.editMode && props.type === 'select'" :class="$style.selectEdit">
      <v-select
        v-model="selectValue"
        clearable
        label="スキー"
        :items="['する', 'しない']"
        hint="1/5まで する場合はレンタル調査にも回答してください"
        persistent-hint
      />
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 8px;
}

.display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.information {
  display: flex;
  gap: 32px;
}

.label {
  font-size: 16px;
}

.value {
  font-size: 16px;
}

.description {
  font-size: 10px;
  color: var(--color-text-secondary);
}

.textEdit {
  display: flex;
  gap: 8px;
  width: 100%;
}

.checkboxContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.checkboxLabel {
  font-size: 14px;
  color: var(--color-ui-primary);
}

.checkbox {
  flex: 0;
}

.numberEdit {
  display: flex;
  gap: 8px;
  width: 100%;
}

.selectEdit {
  display: flex;
  gap: 8px;
  width: 100%;
}
</style>