import { ExtractFnReturnType, QueryConfig, queryClient } from '@/lib/react-query'

import { Phrase } from '../types'
import { axios } from '@/lib/axios'

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
