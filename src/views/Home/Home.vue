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
          :picture="
            picture?.formats.thumbnail.url ||
            'https://cdn.dribbble.com/users/458522/screenshots/13927869/media/722fc6cfab978952bf5f85cfe7319c3f.png?compress=1&resize=1600x1200&vertical=top'
          "
          @click="push({ name: 'game-detail', params: { id: String(id) } })"
        />
      </template>
      <div v-else>Sorry nothing found</div>
    </div>
  </tg-page>
</template>

<script setup lang="ts">
// libs
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// hooks
import useFuse from '../../hooks/useFuse'

// stores
import { useGameStore } from '../../stores/game.store'

// components
import TgPage from '../../components/layout/Page.vue'
import GameCard from '../../components/GameCardList.vue'
import { CirclePlus } from '@element-plus/icons-vue'

// Game Store logic
const gamesStore = useGameStore()
gamesStore.fetchGames()

// Fast Search
const search = ref('')

const gamesList = computed<GSAPI.Game[]>(() =>
  useFuse(gamesStore.gamesList, search.value, {
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
