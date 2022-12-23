<script setup lang="ts">
// libs
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// hooks
import useFuse from '../../hooks/useFuse'

// stores
import { useGameStore, useRawGameStore } from '../../stores'

// components
import TgPage from '../../components/layout/Page.vue'
import Tag from '../../components/Tag.vue'
import GameCard from '../../components/GameCardList.vue'
import { CirclePlus } from '@element-plus/icons-vue'
import { findByKeys } from '../../utils/uniq'

const rawGameStore = useRawGameStore()
rawGameStore.fetchGenres()
// Game Store logic
const gamesStore = useGameStore()
gamesStore.fetchGames()

// Fast Search
const search = ref('')
const filterGenres = ref<string[]>([])
const filterPlatforms = ref<string[]>([])

const toggleGenre = (title: string) => {
  if (filterGenres.value.includes(title)) {
    filterGenres.value = filterGenres.value.filter((tag) => tag !== title)
    return
  }

  filterGenres.value.push(title)
}

const togglePlatforms = (title: string) => {
  if (filterPlatforms.value.includes(title)) {
    filterPlatforms.value = filterPlatforms.value.filter((tag) => tag !== title)
    return
  }

  filterPlatforms.value.push(title)
}

const gamesList = computed<GSAPI.Game[]>(() => {
  let list = gamesStore.gamesList

  if (filterGenres.value.length) {
    list = findByKeys(list, filterGenres.value)
  }

  if (filterPlatforms.value.length) {
    list = list.filter((game) =>
      filterPlatforms.value.includes(game.platform.title)
    )
  }

  return useFuse(list, search.value, {
    threshold: 0.3,
    keys: ['title']
  })
})

const { push } = useRouter()
</script>

<template>
  <tg-page class="list">
    <template #top> Games ({{ gamesList && gamesList.length }}) </template>
    <template #append>
      <el-avatar
        shape="circle"
        :size="40"
        :icon="CirclePlus"
        class="add-icon"
        alt="plus-icon"
        @click="push({ name: 'game-form-create' })"
      />
    </template>
    <div class="list-tags">
      <tag
        v-for="{ title } in gamesStore.availableGenres"
        :active="filterGenres.includes(title)"
        @click="toggleGenre(title)"
      >
        {{ title }}
      </tag>
    </div>
    <div class="list-tags mt-m">
      <tag
        v-for="{ title } in gamesStore.availablePlatforms"
        :active="filterPlatforms.includes(title)"
        @click="togglePlatforms(title)"
      >
        {{ title }}
      </tag>
    </div>
    <div class="list-cards" v-if="!gamesStore.loading">
      <el-input
        class="list-cards__search"
        suffix-icon="el-icon-search"
        placeholder="Поиск"
        v-model="search"
        clearable
      />

      <template v-if="gamesList">
        <game-card
          v-for="{ id, title, description, picture } in gamesList"
          :key="id"
          :description="description"
          :title="title"
          :picture="picture?.formats.thumbnail.url"
          @click="push({ name: 'game-detail', params: { id: String(id) } })"
        />
      </template>
      <div v-else>Sorry nothing found</div>
    </div>
  </tg-page>
</template>

<style lang="scss">
@import './../../assets/styles';

.mt-m {
  margin-top: $spacing-s;
}

.list {
  &-slider {
    .tg-heading {
      padding: 0 0 0 $spacing-m;
    }
  }

  &-cards {
    padding: $spacing-m;
    &__search {
      margin-bottom: $spacing-m;
      .el-input__wrapper {
        border-radius: 0.5rem;
        height: 50px;
        background: none;
        text-align: center;
      }
    }
  }

  &-tags {
    width: 100%;
    display: flex;
    overflow: auto;
    position: relative;
    padding-left: $spacing-m;
    overflow-x: hidden;
  }
}

.add-icon {
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;

  .el-icon-plus {
    font-size: 26px;
  }
}
</style>
