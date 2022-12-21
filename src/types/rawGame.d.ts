declare namespace RAWGAMEAPI {
  type RAW_GAME = {
    slug: string
    name: string
    playtime: number
    platforms: Platform[]
    stores: Store[]
    description: string
    description_raw: string
    released: string
    tba: boolean
    background_image: string
    rating: number
    rating_top: number
    ratings_count: number
    reviews_text_count: number
    added: number
    metacritic?: string
    suggestions_count: number
    updated: string
    id: number
    score: string
    clip?: string
    esrb_rating: number
    user_game: string
    reviews_count: number
    community_rating: number
    saturated_color: string
    dominant_color: string
    ratings: Rating[]
    added_by_status: {
      yet: number
      owned: number
      beaten: number
      dropped: number
    }
    short_screenshots: Screenshot[]
    parent_platforms: ParentPlatform[]
    genres: Genre[]
  }

  type Platform = {
    platform: {
      id: number
      name: string
      slug: string
    }
  }

  type Store = {
    store: {
      id: number
      name: string
      slug: string
    }
  }

  type Rating = {
    id: number
    title: string
    count: number
    percent: number
  }

  type Screenshot = {
    id: number
    image: string
  }

  type ParentPlatform = {
    platform: {
      id: number
      name: string
      slug: string
    }
  }

  type Genre = {
    id: number
    name: string
    slug: string
  }

  type Tag = {
    id: number
    name: string
    slug: string
    language: string
    games_count: number
    image_background: string
  }

  type RawGamesResponse = {
    games: RAW_GAME[]
  }

  type FoundGameGetter = {
    foundGame: Partial<GSAPI.Game>
  }
}
