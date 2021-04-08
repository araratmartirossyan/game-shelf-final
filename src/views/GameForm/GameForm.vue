<template>
  <tg-page class="create-game">
    <template #prepend>
      <el-avatar
        shape="circle"
        :size="40"
        icon="el-icon-back"
        class="header-icon"
        @click="back"
      />
    </template>
    <template #top> Создать игру </template>

    <div class="game-form">
      <el-upload
        class="avatar-uploader"
        action="https://graph.myshelf.info/upload"
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

      <form-game :game-form="gameForm" @update-form="handleUpdateForm" />
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
import { ref, defineAsyncComponent } from 'vue'

// graphQl
import { useMutation } from '@urql/vue'
import { createGameMutation } from '@/graphql/mutations/createGame.mutation'

// Store
import { useRawGameStore, useGameStore } from '@/stores'

// layout
const FormGame = defineAsyncComponent(() => import('@/components/GameForm.vue'))

const { back } = useRouter()

const useRawApiGameStore = useRawGameStore()
const { createGame, createGameError } = useGameStore()

useRawApiGameStore.fetchGenres()

const gameForm = ref<any>({
  title: '',
  description: '',
  genres: [],
  platform: '',
  picture: ''
})

const handleUpdateForm = ({ key, value }: GSAPI.InputForm) => {
  gameForm[key].value = value
}

const { executeMutation } = useMutation(createGameMutation)

const onGameCreate = async () => {
  const prepareForm = useRawApiGameStore.genresIds
    ? {
        ...gameForm.value,
        genres: useRawApiGameStore.genresIds
      }
    : gameForm.value
  await createGame(prepareForm, executeMutation)

  back()
}

const onSetFoundGame = async (game: any) => {
  await useRawApiGameStore.fetchGame(game)
  gameForm.value = {
    ...gameForm.value,
    ...useRawApiGameStore.game
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
