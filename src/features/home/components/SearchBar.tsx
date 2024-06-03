import { Container, FormControl, IconButton, InputBase, Paper, Tooltip, Typography } from '@mui/material'
import { SkipNext as SkipNextIcon, SkipPrevious as SkipPreviousIcon } from '@mui/icons-material'

import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FlagIcon from '@mui/icons-material/Flag'
import { LanguageSelect } from './LanguageSelect'
import { PHRASES_PAGE_SIZE } from '@/config'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { getPhrasesByText } from '../api/getPhrasesByText'
import { searchBarStyles } from './styles'
import { sendPhraseIssueReport } from '../api/sendPhraseIssueReport'
import { usePhrasesStore } from '@/store/phrases'

export const SearchBar = () => {
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const [reportedIssues, setReportedIssues] = React.useState<string[]>([])

  const {
    setPhrases,
    setActivePhraseIndex,
    activePhraseIndex,
    activePhrase,
    phrases,
    totalPhrases,
    lastLoadedPage,
    setLastLoadedPage,
    setSearchText,
    searchText
  } = usePhrasesStore()

  const handleSearch = () => {
    const currentSearchText = searchInputRef.current?.value?.trim()

    if (currentSearchText) {
      setSearchText(currentSearchText)
      getPhrasesByText({
        search_text: searchInputRef.current?.value || '',
        page: 1,
        config: { enabled: false }
      }).then((phrasesData) => {
        setPhrases(phrasesData, true)
        setSearchText(currentSearchText)
      })
    }
  }

  React.useEffect(() => {
    const currentPhrasesLength = phrases.length
    const pageToLoad = Math.floor(activePhraseIndex / PHRASES_PAGE_SIZE) + 2

    if (currentPhrasesLength < totalPhrases && pageToLoad > lastLoadedPage) {
      setLastLoadedPage(pageToLoad)

      getPhrasesByText({
        search_text: searchText,
        page: pageToLoad,
        config: { enabled: false }
      }).then((phrasesData) => {
        setPhrases(phrasesData, false)
      })
    }
  }, [activePhraseIndex, totalPhrases, lastLoadedPage, phrases, setPhrases, searchText, setLastLoadedPage])

  const handleChangePhrase = (index: number) => {
    setActivePhraseIndex(index)
  }

  const handleReportIssue = () => {
    const activePhraseId = activePhrase?.id

    if (activePhraseId && !reportedIssues.includes(activePhraseId)) {
      setReportedIssues([...reportedIssues, activePhraseId])
      sendPhraseIssueReport({ phraseId: activePhraseId })
    }
  }

  return (
    <Container maxWidth={false}>
      <FormControl fullWidth sx={searchBarStyles.formControl}>
        <Paper component="form" sx={searchBarStyles.formPaper}>
          <LanguageSelect />
          <InputBase
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearch()
              }
            }}
            sx={searchBarStyles.inputBase}
            aria-label="search"
            placeholder="Type a phrase"
            inputRef={searchInputRef}
          />
          <Tooltip title="Search" placement="top">
            <IconButton type="button" sx={searchBarStyles.iconButton} aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous" placement="top">
            <IconButton
              type="button"
              onClick={() => handleChangePhrase(activePhraseIndex - 1)}
              sx={searchBarStyles.iconButton}
              aria-label="previous"
              disabled={activePhraseIndex === 0 || !activePhrase}>
              <SkipPreviousIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="body1" sx={searchBarStyles.itemCounterText}>
            {activePhrase ? activePhraseIndex + 1 : 0} / {totalPhrases}
          </Typography>
          <Tooltip title="Next" placement="top">
            <IconButton
              type="button"
              onClick={() => handleChangePhrase(activePhraseIndex + 1)}
              sx={searchBarStyles.iconButton}
              aria-label="next"
              disabled={activePhraseIndex === phrases.length - 1 || !activePhrase}>
              <SkipNextIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download" placement="top">
            <IconButton
              component="a"
              href={activePhrase?.scene_s3_key}
              aria-label="download"
              disabled={!activePhrase}
              sx={searchBarStyles.iconButton}>
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Report a problem" placement="top">
            <IconButton
              type="button"
              onClick={handleReportIssue}
              sx={searchBarStyles.iconButton}
              aria-label="Report a problem"
              disabled={activePhrase && reportedIssues.includes(activePhrase.id)}>
              <FlagIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      </FormControl>
    </Container>
  )
}
