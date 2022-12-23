<template>
  <div class="game-card">
    <div
      class="game-card__image"
      :style="{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover'
      }"
    ></div>
    <div class="game-card__description">
      <heading tag="h5">{{ title }}</heading>
      <p>{{ description && description.slice(0, 50) }}...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Heading from './Heading.vue'

const defaultUrl =
  import.meta.env.VITE_APP_API_URL || 'https://myshelf.incodewetrust.dev'

const props = defineProps<{
  title: string
  picture?: string
  description: string
}>()

const imageUrl = !props.picture
  ? `${defaultUrl}/uploads/game_controller_221caf2dd1.svg`
  : `${defaultUrl}${props.picture}`
</script>

<style lang="scss">
@import '../assets/styles';
.game-card {
  color: white;
  display: flex;
  font-family: Nunito;
  overflow: hidden;
  padding: $spacing-s;
  height: 100%;
  border-radius: 1rem;
  background-color: $color-secondary;
  margin-bottom: $spacing-s;

  &__image {
    width: 100%;
    border-radius: 1rem;
    height: 140px;
  }

  &:active {
    background: rgb(128 128 128 / 25%);
    box-shadow: none;
  }

  &__description {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    width: 100%;
    margin-left: $spacing-m;

    p {
      font-size: $font-size-small;
      margin-bottom: 0;
    }
  }
}
</style>
