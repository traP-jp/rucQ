<!-- 外側の高さ 100% に合わせて縦スクロールさせるためのコンポーネント -->

<template>
  <div :class="$style.remainder">
    <div :class="$style.container">
      <div :class="$style.content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style module>
.remainder {
  height: 100%;
  width: 100%;
  position: relative;
}

.container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  position: absolute;
}

.content {
  width: 100%;
  min-height: 100%;
  height: fit-content;
  position: relative;
}
</style>
