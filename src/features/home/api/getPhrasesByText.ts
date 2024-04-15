import { useQuery } from '@tanstack/react-query'

import { axios } from '@/lib/axios'

import { Phrase } from '../types'
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'

const getPhrasesByText = (search_text: string): Promise<Phrase[]> => {
  return axios.get('/phrases/get-by-search-text?search_text=' + search_text)
}

type QueryFnType = typeof getPhrasesByText

type UsePhrasesByTextOptions = {
  search_text: string
  config?: QueryConfig<QueryFnType>
}

export const usePhrasesByText = ({ search_text, config = {} }: UsePhrasesByTextOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['phrases-by-text', search_text],
    queryFn: () => getPhrasesByText(search_text)
  })
}
