<template>
  <tg-page class="create-game">
    <template #prepend>
      <el-avatar
        shape="circle"
        :size="40"
        :icon="Back"
        class="header-icon"
        @click="back"
      />
    </template>
    <template #top> Создать игру </template>

    <div class="game-form">
      <el-upload
        class="avatar-uploader"
        action="https://myshelf.incodewetrust.dev/upload"
        :show-file-list="false"
        name="files"
        :on-success="handleUploadSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-select
        v-model="useRawApiGameStore.game"
        @change="onSetFoundGame"
        filterable
        remote
        reserve-keyword
        placeholder="Начните писать название игры"
        :remote-method="useRawApiGameStore.searchGame"
        :loading="useRawApiGameStore.loading"
      >
        <el-option
          v-for="item in useRawApiGameStore.options"
          :key="item.value"
          :label="item.label"
          :value="item"
        >
        </el-option>
      </el-select>

      <form-game
        v-model:description="gameForm.description"
        v-model:genres="gameForm.genres"
        v-model:platform="gameForm.platform"
        v-model:title="gameForm.title"
      />
      <span class="create-game__form--error"> {{ createGameError }} </span>
    </div>
    <template #bottom>
      <el-button
        class="create-game__confirm"
        @click.prevent="() => onGameCreate()"
      >
        Создать
      </el-button>
    </template>
  </tg-page>
</template>

<script setup lang="ts">
// libs
import { useRouter } from 'vue-router'
import { ref, unref } from 'vue'

// Store
import { useRawGameStore, useGameStore } from '../../stores'

// layout
import TgPage from '../../components/layout/Page.vue'
import FormGame from '../../components/GameForm.vue'
import { Back } from '@element-plus/icons-vue'

const { back } = useRouter()

const useRawApiGameStore = useRawGameStore()
const { createGame, createGameError } = useGameStore()

interface GamePickerInput {
  label: string
  value: RAWGAMEAPI.RAW_GAME
}

useRawApiGameStore.fetchGenres()

const gameForm = ref<GSAPI.CreateGameInput>({
  title: '',
  description: '',
  genres: [],
  platform: '',
  picture: ''
})

const onGameCreate = async () => {
  const form = unref(gameForm)
  const prepareForm = useRawApiGameStore.genresIds
    ? {
        ...form,
        genres: useRawApiGameStore.genresIds as string[]
      }
    : form
  await createGame(prepareForm)

  back()
}

const onSetFoundGame = async (game: GamePickerInput) => {
  await useRawApiGameStore.fetchGame(game.value)
  console.log(useRawApiGameStore.game)
  if (useRawApiGameStore.game) {
    const { title, description, genres } = useRawApiGameStore.game
    gameForm.value = {
      ...gameForm.value,
      title,
      description,
      genres
    }
  }
}

// Image Logic
const imageUrl = ref('')

const handleUploadSuccess = ([res]: any, file: any) => {
  imageUrl.value = URL.createObjectURL(file.raw)
  gameForm.value.picture = res._id
}
</script>

<style lang="scss">
@import '../../assets/styles';

.create-game {
  &__confirm {
    width: 100%;
    background: $color-primary;
    color: $color-white;
    border: none;
    height: 50px;
    border-radius: 0;
    font-family: 'Nunito Bold';
  }

  &__form {
    &--error {
      color: red;
    }
  }
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

.game-form {
  padding: $spacing-m;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-bottom: $spacing-s;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  object-fit: cover;
  height: 178px;
  display: block;
}

// El Elements
.el-select {
  width: 100%;
}

.el-message {
  font-family: Nunito;
}
</style>
