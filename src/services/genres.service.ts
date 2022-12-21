import { axiosInstance } from '.'

export const fetchGenres = (): Promise<GSAPI.Genre[]> =>
  axiosInstance.get('/genres')

export const fetchPlatforms = (): Promise<GSAPI.Platform[]> =>
  axiosInstance.get('/platforms')
