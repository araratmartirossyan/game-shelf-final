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
        v-model="currentGame"
        @change="onSetFoundGame"
        filterable
        remote
        reserve-keyword
        placeholder="Начните писать название игры"
        :remote-method="remoteMethod"
        :loading="searchLoading"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item"
        >
        </el-option>
      </el-select>

      <form-game
        ref="formRef"
        :game-form="gameForm"
        @update-form="handleUpdateForm"
      />
      <span class="create-game__form--error"> {{ formError }} </span>
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
import { omit } from 'ramda'

// hooks
import { handleCreateGame } from './utils/createGame'
import { searchGame } from './utils/searchGame'

// graphQl
import { useMutation } from '@urql/vue'
import { createGame } from './../../graphql/mutations/createGame.mutation'

// layout
const TgPage = defineAsyncComponent(
  () => import('@/components/layout/Page.vue')
)
const FormGame = defineAsyncComponent(() => import('@/components/GameForm.vue'))

const { back } = useRouter()

const {
  remoteMethod,
  foundGame,
  currentGame,
  searchLoading,
  options
} = searchGame()

const gameForm = ref<any>({
  title: '',
  description: '',
  genres: [],
  genresIds: [],
  platform: '',
  picture: ''
})

const formError = ref('')
const formRef = ref(null)

const handleUpdateForm = ({ key, value }: GSAPI.InputForm) => {
  gameForm[key].value = value
}

const { executeMutation } = useMutation(createGame)

const onGameCreate = async () => {
  const prepareForm = gameForm.value.genresIds
    ? {
        ...gameForm.value,
        genres: gameForm.value.genresIds
      }
    : gameForm.value

  await handleCreateGame(
    formError,
    omit(['genresIds'], prepareForm),
    executeMutation
  )
  back()
}

const onSetFoundGame = async (game: any) => {
  const convertedGame = await foundGame(game)
  gameForm.value = {
    ...gameForm.value,
    ...convertedGame
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
