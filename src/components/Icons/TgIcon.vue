<template>
  <svg aria-hidden="true" class="gs-icon" :style="styleObject">
    <use :xlink:href="`#${icon}`" class="gs-icon" />
  </svg>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    required: false,
    default: null
  }
})

const styleObject = computed(() => {
  const style = {
    height: '',
    width: ''
  }

  if (props.size) {
    style.height = `${props.size}px`
    style.width = `${props.size}px`
  }

  return style
})
</script>

<style lang="scss" scoped>
@import './../../assets/styles';

.gs-icon {
  fill: none;
  height: $spacing-m * 1.25;
  width: $spacing-m * 1.25;
}
</style>
