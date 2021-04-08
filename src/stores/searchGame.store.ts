import { defineStore } from 'pinia'
import { useQuery, gql } from '@urql/vue'

// services
import { findGame, fetchGame } from '@/services/search.service'
import { prepareGenres } from '@/services/prepareData.service'

// GraphQL
import { fetchGenres } from '@/graphql/queries/genres.query'
import { Ref } from 'vue'


type useRawGameStoreState = {
  game: Partial<RAWGAMEAPI.RAW_GAME>;
  games: RAWGAMEAPI.RAW_GAME[];
  loading: boolean;
  genres: GSAPI.Genre[];
  foundGame: GSAPI.GameForm;
  genresIds: (string | undefined)[];
}


export const useRawGameStore = defineStore({
  id: 'rawGameApi',
  state: (): useRawGameStoreState => ({
    game: {},
    games: [],
    loading: false,
    genres: [],
    foundGame: {},
    genresIds: []
  }),
  getters: {
    gamesList: ({ games }: RAWGAMEAPI.RawGamesResponse) => games,
    options: ({ games }: RAWGAMEAPI.RawGamesResponse) => games.map((game) => ({
      label: game.name,
      value: game,
    })),
    game: ({ foundGame }: RAWGAMEAPI.FoundGameGetter) => foundGame
  },
  actions: {
    async searchGame(qs: string) {
      this.loading = true
      this.games = await findGame(qs)
      this.loading = false
    },
    async fetchGenres() {
      const { data } = await useQuery({ query: fetchGenres })
      this.genres = data.value.genres
    },
    async fetchGame(game: Ref<RAWGAMEAPI.RAW_GAME>) {
      const fetchedGame = await fetchGame(game.value.id)
      const parsedGenres = prepareGenres(game.value.genres, this.genres)

      this.genresIds = parsedGenres.apiValues

      this.foundGame = {
        title: fetchedGame.name,
        description: fetchedGame.description_raw,
        genres: parsedGenres.formValues as string[],
      }
    }

  },
})