import { BaseEntity } from '@/types'

export type Movie = BaseEntity & {
  title: string
  year: number
}

export type Phrase = BaseEntity & {
  movie: Movie
  full_text: string
  scene_s3_key: string
  start_in_movie: string
  matched_phrase: string
}

export type PaginatedPhrases = {
  items: Phrase[]
  total: number
  page: number
  size: number
  pages: number
}
