import { defineStore } from 'pinia'
// services
import * as SearchService from '../services/search.service'
import * as GenresService from '../services/genres.service'

import { prepareGenres } from '../services/prepareData.service'

// GraphQL
import { computed, ref } from 'vue'

export const useRawGameStore = defineStore('rawGameApi', () => {
  const gamesList = ref<RAWGAMEAPI.RAW_GAME[]>([])
  const loading = ref<boolean>()
  const genres = ref<GSAPI.Genre[]>([])
  const platforms = ref<GSAPI.Platform[]>([])
  const foundGame = ref<GSAPI.FoundGameInput | null>(null)
  const genresIds = ref<(string | undefined)[]>([])

  const searchGame = async (qs: string) => {
    loading.value = true
    gamesList.value = await SearchService.findGame(qs)
    loading.value = false
  }
  const fetchGenres = async () => {
    const data = await GenresService.fetchGenres()
    genres.value = data
  }

  const fetchPlatforms = async () => {
    const data = await GenresService.fetchPlatforms()
    platforms.value = data
  }

  const fetchGame = async (game: RAWGAMEAPI.RAW_GAME) => {
    const fetchedGame = await SearchService.fetchGame(game.id)
    const parsedGenres = prepareGenres(game.genres, genres.value)
    genresIds.value = parsedGenres.apiValues

    foundGame.value = {
      title: fetchedGame.name,
      description: fetchedGame.description_raw,
      genres: parsedGenres.formValues as string[]
    }
  }

  return {
    gamesList,
    options: computed(() =>
      gamesList.value.map((game) => ({
        label: game.name,
        value: game
      }))
    ),
    loading,
    game: foundGame,
    fetchGame,
    searchGame,

    fetchGenres,
    genresIds,
    genres,

    fetchPlatforms,
    platforms
  }
})
