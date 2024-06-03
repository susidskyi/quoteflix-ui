import { ExtractFnReturnType, QueryConfig, queryClient } from '@/lib/react-query'

import { axios } from '@/lib/axios'

const sendPhraseIssueReportQuery = (phraseId: string): Promise<null> => {
  return axios.post(`/phrases/${phraseId}/issues`)
}

type QueryFnType = typeof sendPhraseIssueReportQuery

type SendPhraseIssueReportOptions = {
  phraseId: string
  config?: QueryConfig<QueryFnType>
}

export const sendPhraseIssueReport = ({ phraseId, config = {} }: SendPhraseIssueReportOptions) => {
  return queryClient.fetchQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['send-phrase-issue-report', phraseId],
    queryFn: () => sendPhraseIssueReportQuery(phraseId)
  })
}
