import { BaseEntity } from '@/types'

export type Phrase = BaseEntity & {
  movie_id: string
  full_text: string
  scene_s3_key: string
  matched_phrase: string
}

export type PaginatedPhrases = {
  items: Phrase[]
  total: number
  page: number
  size: number
  pages: number
}
