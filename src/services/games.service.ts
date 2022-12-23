import { axiosInstance } from '.'

export const fetchGames = (): Promise<GSAPI.Game[]> =>
  axiosInstance.get('/games')

export const fetchGame = (id: string): Promise<GSAPI.Game> =>
  axiosInstance.get(`/games/${id}`)

export const createGame = (gameForm: GSAPI.GameForm): Promise<GSAPI.Game> =>
  axiosInstance.post('/games', gameForm)

export const updateGame = (
  gameForm: Partial<GSAPI.GameForm>,
  id: string
): Promise<GSAPI.Game> => axiosInstance.put(`/games/${id}`, gameForm)

export const deleteGame = (id: string): Promise<GSAPI.Game> =>
  axiosInstance.delete(`/games/${id}`)
