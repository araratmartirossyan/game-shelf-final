<template>
  <tg-page class="list">
    <template #top> Games ({{ gamesList && gamesList.length }}) </template>
    <template #append>
      <el-avatar
        shape="circle"
        :size="40"
        icon="el-icon-plus"
        class="add-icon"
        alt="plus-icon"
        @click="push({ name: 'game-form-create' })"
      />
    </template>

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

<script setup lang="ts">
// libs
import { ref, defineAsyncComponent, computed } from 'vue'
import { useRouter } from 'vue-router'

// hooks
import useFuse from '@/hooks/useFuse'

// stores
import { useGameStore } from '@/stores/game.store'

// components
const GameCard = defineAsyncComponent(
  () => import('@/components/GameCardList.vue')
)

// Game Store logic
const gamesStore = useGameStore()
gamesStore.fetchGames()

// Fast Search
const search = ref('')

const gamesList = computed<GSAPI.Game[]>(() =>
  useFuse(gamesStore.games, search.value, {
    threshold: 0.3,
    keys: ['title']
  })
)

const { push } = useRouter()
</script>

<style lang="scss">
@import './../../assets/styles';

.list-slider {
  .tg-heading {
    padding: 0 0 0 $spacing-m;
  }
}
.list-cards {
  padding: $spacing-m;

  &__search {
    margin-bottom: $spacing-m;
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
