<template>
  <tg-page class="create-game">
    <template #prepend>
      <el-avatar
        shape="circle"
        :size="40"
        :icon="Back"
        class="header-icon"
        @click="push('/')"
      />
    </template>
    <template #top> {{ gamesStore?.oneGame?.title }} </template>
    <template #append>
      <el-avatar
        shape="circle"
        :size="50"
        :icon="Delete"
        class="add-icon"
        @click="handleDeleteGame"
      />
    </template>

    <div class="game-info" v-if="gamesStore.oneGame">
      <div class="game-info__header">
        <el-avatar
          shape="square"
          scale="fill"
          :src="gamesStore.oneGamePicture"
        />
      </div>
      <div class="game-info__content">
        <div class="game-info__content-header">
          <div class="game-info__content_text">
            <heading tag="h2">
              {{ gamesStore.oneGame.title }}
            </heading>
            <span class="game-info__content_platform">
              {{ gamesStore.oneGame.platform?.title }}
            </span>

            <div class="game-info__content_tags">
              <el-tag
                class="game-info__content_tags"
                v-for="genre in gamesStore.oneGame.genres"
                :key="genre?.title"
                type="info"
              >
                #{{ genre?.title }}
              </el-tag>
            </div>
          </div>
        </div>

        <div class="game-info__content-description">
          <heading tag="h5" bold> Описание: </heading>
          <p class="paragraph">
            {{ gamesStore.oneGame.description }}
          </p>
        </div>
      </div>
    </div>
  </tg-page>
</template>

<script setup lang="ts">
// libs
import { useRoute, useRouter } from 'vue-router'

// stores
import { useGameStore } from '../../stores/game.store'

// Components
import TgPage from '../../components/layout/Page.vue'
import Heading from '../../components/Heading.vue'
import { Delete, Back } from '@element-plus/icons-vue'

const { params } = useRoute()
const { push } = useRouter()

const gamesStore = useGameStore()
gamesStore.fetchGame(params.id as string)

const handleDeleteGame = async () => {
  const result = await gamesStore.deleteGame(params.id as string)
  if (result) {
    push('/')
  }
}
</script>

<style lang="scss">
@import './../../assets/styles';

.add-icon {
  background: none;
}
.el-message-box {
  width: 300px;
  font-family: 'Nunito';
}
.header-icon {
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;

  .el-icon-back {
    font-size: 26px;
  }
}
.game-info {
  padding: 10px;
  &__header {
    display: flex;

    .el-avatar {
      width: 100%;
      height: 460px;
      border-radius: 32px;

      background: none;

      img {
        width: 100%;
      }
    }
  }

  &__content {
    padding: 12px;
    color: white;
    font-family: Nunito;
    border-radius: 16px;

    &_text {
      display: flex;
      flex-direction: column;
    }

    &_platform {
      font-size: $font-size-heading-h5;
      color: $color-white;
    }

    &_tags {
      margin-top: $spacing-xs;
      display: flex;

      & > span {
        &:not(:first-child) {
          margin-left: $spacing-xs;
        }
      }
    }

    &-description {
      margin-top: $spacing-m;
      font-size: 14pxr;
    }
  }
}
</style>
