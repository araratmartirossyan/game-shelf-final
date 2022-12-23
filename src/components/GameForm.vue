<template>
  <el-form
    ref="validationRef"
    label-width="100px"
    label-position="top"
    :rules="rules"
  >
    <el-form-item label="Название игры">
      <el-input
        placeholder="Название игры"
        :model-value="title"
        @input="(value: string) => $emit('update:title', value)"
      />
    </el-form-item>
    <el-form-item label="Описание игры">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="Описание игры"
        :model-value="description"
        @input="(value: string) => $emit('update:description', value)"
      />
    </el-form-item>
    <el-form-item label="Выбрать жанр">
      <el-select
        :model-value="genres"
        filterable
        :multiple-limit="1"
        remote
        reserve-keyword
        placeholder="Жанр"
        :remote-method="searchGenre"
        @change="(value: string) => $emit('update:genres', value)"
      >
        <el-option
          v-for="item in foundGenres"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Выбрать платформу">
      <el-select
        :model-value="platform"
        filterable
        remote
        reserve-keyword
        v-focus
        placeholder="Платформа"
        :remote-method="searchPlatform"
        @change="(value: string) => $emit('update:platform', value)"
      >
        <el-option
          v-for="item in foundPlatforms"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
// libs
import { onMounted, ref } from 'vue'
import useFuse from './../hooks/useFuse'

// Graph Ql
import { useRawGameStore } from '../stores/searchGame.store'

defineEmits<{
  (e: 'update:genres', value: string[]): void
  (e: 'update:platform', value: string): void
  (e: 'update:description', value: string): void
  (e: 'update:title', value: string): void
}>()

defineProps<{
  genres: string[]
  platform: string
  description: string
  title: string
}>()

const vFocus = {
  mounted: (el: HTMLInputElement) => {
    const input = el.querySelector('.el-input__inner')
    if (input) {
      input.removeAttribute('readonly')
    }
  }
}

const validationRef = ref(null)

const rules = {
  plarform: [
    { required: true, message: 'Выберите платформу', trigger: 'blur' }
  ],
  genres: [
    { required: true, message: 'Выберите как мин один жанр', trigger: 'blur' }
  ]
}

const gameStore = useRawGameStore()

onMounted(async () => {
  await gameStore.fetchPlatforms()
})

// Genres
const foundGenres = ref<GSAPI.Genre[]>([])
const searchGenre = (title: string) => {
  foundGenres.value = useFuse<GSAPI.Genre>(gameStore.genres, title, {
    threshold: 0.3,
    keys: ['title']
  })
}

// Platform
const foundPlatforms = ref<GSAPI.Platform[]>([])
const searchPlatform = (title: string) => {
  foundPlatforms.value = useFuse<GSAPI.Platform>(gameStore.platforms, title, {
    threshold: 0.3,
    keys: ['title']
  })
}
</script>

<style lang="scss">
.el-form-item__label {
  padding-bottom: 0;
  font-family: Nunito;
  padding: 0 !important;
}

::placeholder,
.el-select-dropdown__item {
  font-family: Nunito;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: black;
}

.el-popper {
  width: 97%;
}

.el-textarea__inner {
  color: white;
}
</style>
