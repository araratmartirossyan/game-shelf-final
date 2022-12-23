<script lang="ts" setup>
defineProps<{ active: boolean }>()
</script>

<template>
  <button
    class="gs-tag"
    :class="{
      'gs-active': active
    }"
  >
    <slot />
  </button>
</template>

<style lang="scss">
@import '../assets/styles';
.gs-active {
  background: white !important;
  color: black !important;
}

.gs-tag {
  margin-right: $spacing-s;
  height: 40px;
  flex-shrink: 0;
  color: white;
  background: $color-secondary;
  border-radius: 1rem;
  border: none;
}
</style>
