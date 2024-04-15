import { BaseEntity } from '@/types'

export type Phrase = BaseEntity & {
  movie_id: string
  full_text: string
  scene_s3_key?: string
}
