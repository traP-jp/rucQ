<!-- 外側の高さ 100% に合わせて縦スクロールさせるためのコンポーネント -->

<template>
  <div :class="$style.container">
    <div :class="$style.scroll">
      <slot></slot>
    </div>
  </div>
</template>

<style module>
.container {
  overflow-y: auto;
  position: relative;
  height: 100%;
  width: 100%;
}

.scroll {
  width: 100%;
  height: 100%;
  min-height: fit-content;
  position: absolute;
  display: flex;
  align-items: stretch;
}
</style>
