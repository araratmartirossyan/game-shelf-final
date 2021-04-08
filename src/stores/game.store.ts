import { defineStore } from 'pinia'
import { useQuery, gql } from '@urql/vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// GraphQL requests
import { myGames } from '@/graphql/queries/games.query'
import { game } from '@/graphql/queries/game.query'

// Types
import { OperationContext, OperationResult } from '@urql/core'

type ExecMutation = (variables: any, context?: Partial<OperationContext>) => Promise<OperationResult<any>>

const defaultUrl = import.meta.env.API_URL || 'https://graph.myshelf.info'

export const useGameStore = defineStore({
  id: 'games',
  state: () => ({
    game: {},
    games: [],
    loading: false,
    createGameError: {}
  }),
  getters: {
    gamesList: ({ games }: GSAPI.GamesResponse) => games,
    oneGame: ({ game }: GSAPI.GameResponse) => game,
    oneGamePicture: ({ game }: GSAPI.GameResponse) => {
      const picture = game?.picture?.formats.large
      return picture ? `${defaultUrl}${picture.url}` : `${defaultUrl}/uploads/game_controller_221caf2dd1.svg`
    }
  },
  actions: {
    async fetchGames() {
      const { fetching, data } = await useQuery({
        query: gql(myGames)
      })
      this.loading = fetching.value
      this.games = data.value.games
    },
    async fetchGame(id: string | string[]) {
      const { data } = await useQuery({
        query: gql(game),
        variables: { id }
      })
      this.game = data.value.game as GSAPI.GameResponse
    },
    async deleteGame(id: string | string[], executeMutation: ExecMutation) {
      try {
        await ElMessageBox.confirm('Игра будет удалена', 'Внимание', {
          type: 'warning',
          confirmButtonText: 'OK',
          cancelButtonText: 'Отмена'
        })
        await executeMutation({
          input: { where: { id } }
        })
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
    },
    async createGame(
      gameForm: GSAPI.CreateGameInput,
      executeMutation: ExecMutation
    ) {
      const { error } = await executeMutation({
        input: { data: { ...gameForm } },
      })

      if (error) {
        this.createGameError = error.message
        ElMessage({
          message: error.message,
          type: 'error',
          center: true,
        })
      }

      ElMessage({
        message: 'Игра добавлена',
        type: 'success',
        center: true,
      })
    }
  },
})