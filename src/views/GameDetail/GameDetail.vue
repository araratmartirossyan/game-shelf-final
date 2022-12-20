<template>
  <tg-page class="create-game">
    <template #prepend>
      <el-avatar
        shape="circle"
        :size="40"
        icon="el-icon-back"
        class="header-icon"
        @click="push('/')"
      />
    </template>
    <template #top> Игра </template>
    <template #append>
      <el-avatar
        shape="circle"
        :size="50"
        icon="el-icon-delete"
        class="add-icon"
        @click="handleDeleteGame"
      />
    </template>

    <div class="game-info" v-if="gamesStore.game">
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
import { defineAsyncComponent } from 'vue'

// GraphQl
import { deleteGame } from '@/graphql/mutations/deleteGame.mutation'
import { useMutation } from '@urql/vue'

// stores
import { useGameStore } from '@/stores/game.store'

// Components
const Heading = defineAsyncComponent(() => import('@/components/Heading.vue'))

const { params } = useRoute()
const { push } = useRouter()

const gamesStore = useGameStore()
gamesStore.fetchGame(params.id)

// Can't call useMutation outside of setup function
const { executeMutation } = useMutation(deleteGame)

const handleDeleteGame = async () => {
  const result = await gamesStore.deleteGame(params.id, executeMutation)
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
      box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset,
        rgb(51 51 51 / 20%) 0px 2px 5px 0px;
      background: none;

      img {
        width: 100%;
      }
    }
  }

  &__content {
    padding: 12px;
    border-radius: 16px;
    margin-top: $spacing-m;

    &_text {
      display: flex;
      flex-direction: column;
    }

    &_platform {
      font-size: $font-size-heading-h5;
      color: $color-dark;
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
