import { useQuery } from '@tanstack/react-query'

import { axios } from '@/lib/axios'

import { Phrase } from '../types'
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import { queryClient } from '@/lib/react-query'

const getPhrasesByTextQuery = (search_text: string): Promise<Phrase[]> => {
  return axios.get('/phrases/get-by-search-text?search_text=' + search_text)
}

type QueryFnType = typeof getPhrasesByTextQuery

type UsePhrasesByTextOptions = {
  search_text: string
  config?: QueryConfig<QueryFnType>
}

export const getPhrasesByText = ({ search_text, config = {} }: UsePhrasesByTextOptions) => {
  return queryClient.fetchQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['phrases-by-text', search_text],
    queryFn: () => getPhrasesByTextQuery(search_text)
  })
}
