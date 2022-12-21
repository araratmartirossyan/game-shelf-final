<template>
  <div class="tg-page">
    <div class="tg-page__top">
      <div class="prepend">
        <slot name="prepend" />
      </div>
      <div class="middle">
        <slot name="top" />
      </div>
      <div class="append">
        <slot name="append" />
      </div>
    </div>

    <div ref="pageContent" class="tg-page__content">
      <slot />
    </div>

    <div class="tg-page__bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import './../../assets/styles';

.tg-page {
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  padding: 0;
  padding: env(safe-area-inset-top, 0) env(safe-area-inset-right, 0)
    env(safe-area-inset-bottom, 0) env(safe-area-inset-left, 0);
  position: absolute;
  right: 0;
  top: 0;
  background: #f1f2f6;

  &__top {
    color: #fff;
    background-color: #132968;
    height: 52px;
    display: flex;
    padding: 0 $spacing-m;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }

  &__top,
  &__bottom {
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    z-index: 104;
  }
  &__content {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 104;
  }

  .prepend,
  .append,
  .middle {
    width: 100%;
  }

  .middle {
    text-align: center;
  }

  .append {
    align-items: center;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
