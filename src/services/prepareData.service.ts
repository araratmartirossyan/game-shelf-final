export const prepareGenres = (
  currentGenres: RAWGAMEAPI.Genre[],
  genres: GSAPI.Genre[]
) => {
  const valuesGenres = currentGenres
    .map((genre) => genre.name)
    .map((genre: string) => {
      const findGenre = genres.find(
        (currentGenre) => currentGenre && currentGenre.title?.includes(genre)
      )
      return findGenre
    })
    .filter((genre) => genre)

  return {
    formValues: valuesGenres.map((genre) => genre?.title) || [],
    apiValues: valuesGenres.map((genre) => genre?.id) || []
  }
}

export const preparePlatforms = (
  currentPlatforms: any,
  platforms: Partial<GSAPI.Platform[]>
) => {
  return currentPlatforms
    .map(({ platform }: any) => platform.name)
    .map((platform: any) => platforms.find((i) => i && i.title === platform))
}
