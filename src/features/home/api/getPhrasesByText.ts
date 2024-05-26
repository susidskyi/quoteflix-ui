import { ExtractFnReturnType, QueryConfig, queryClient } from '@/lib/react-query'

import { PaginatedPhrases } from '../types'
import { axios } from '@/lib/axios'

const getPhrasesByTextQuery = (search_text: string, page: number): Promise<PaginatedPhrases> => {
  return axios.get('/phrases/get-by-search-text', { params: { search_text, page } })
}

type QueryFnType = typeof getPhrasesByTextQuery

type UsePhrasesByTextOptions = {
  search_text: string
  page: number
  config?: QueryConfig<QueryFnType>
}

export const getPhrasesByText = ({ search_text, page, config = {} }: UsePhrasesByTextOptions) => {
  return queryClient.fetchQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['phrases-by-text', search_text, page],
    queryFn: () => getPhrasesByTextQuery(search_text, page)
  })
}
