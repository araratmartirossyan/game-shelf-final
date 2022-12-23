import { defineStore } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'

// Services
import * as GameService from './../services/games.service'

// Types
import { ref, computed } from 'vue'
import { getUniqueObjects } from '../utils/uniq'

const defaultUrl = 'https://myshelf.incodewetrust.dev'

export const useGameStore = defineStore('gameStore', () => {
  const loading = ref<boolean>()
  const createGameError = ref<any>()
  // Game
  const oneGame = ref<GSAPI.Game | null>(null)

  const fetchGame = async (id: string) => {
    const data = await GameService.fetchGame(id)
    oneGame.value = data
  }

  const oneGamePicture = computed(() => {
    const picture = oneGame.value?.picture?.formats.large
    return picture
      ? `${defaultUrl}${picture.url}`
      : `${defaultUrl}/uploads/game_controller_221caf2dd1.svg`
  })

  // GameList
  const gamesList = ref<GSAPI.Game[]>([])
  const fetchGames = async () => {
    loading.value = true
    const games = await GameService.fetchGames()
    gamesList.value = games
    loading.value = false
  }

  // Delete Game
  const deleteGame = async (id: string) => {
    try {
      await ElMessageBox.confirm('Игра будет удалена', 'Внимание', {
        type: 'warning',
        confirmButtonText: 'OK',
        cancelButtonText: 'Отмена'
      })
      await GameService.deleteGame(id)
      ElMessage({
        type: 'success',
        message: 'Удалено'
      })
      return 'Success'
    } catch (err) {
      ElMessage({
        type: 'info',
        message: 'Отменено'
      })
      throw new Error('Canceled')
    }
  }

  const createGame = async (gameForm: GSAPI.CreateGameInput) => {
    try {
      await GameService.createGame(gameForm)
      ElMessage({
        message: 'Игра добавлена',
        type: 'success',
        center: true
      })
    } catch (error: any) {
      createGameError.value = error.message
      ElMessage({
        message: error.message,
        type: 'error',
        center: true
      })
    }
  }

  return {
    oneGame,
    oneGamePicture,
    fetchGame,
    deleteGame,
    createGame,
    createGameError,
    loading,
    gamesList,
    availableGenres: computed(() =>
      getUniqueObjects<GSAPI.Genre>(
        gamesList.value.flatMap((item) => item.genres)
      )
    ),
    availablePlatforms: computed(() =>
      getUniqueObjects<GSAPI.Platform>(
        gamesList.value.flatMap((item) => item.platform)
      )
    ),
    fetchGames
  }
})
