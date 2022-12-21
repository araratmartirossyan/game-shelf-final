import { request } from './rest.service'

export const findGame = async (
  searchString: string
): Promise<RAWGAMEAPI.RAW_GAME[]> => {
  const data = await request(
    `games?search=${searchString}&key=d3a8596b18364a458089d109a36be3d5`
  )
  return data.results
}

export const fetchGame = async (id: number): Promise<RAWGAMEAPI.RAW_GAME> => {
  const data = await request(`games/${id}?key=d3a8596b18364a458089d109a36be3d5`)
  return data
}
