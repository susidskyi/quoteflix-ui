import { Container, FormControl, IconButton, InputBase, Paper, Typography } from '@mui/material'
import { SkipNext as SkipNextIcon, SkipPrevious as SkipPreviousIcon } from '@mui/icons-material'

import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { LanguageSelect } from './LanguageSelect'
import { PHRASES_PAGE_SIZE } from '@/config'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { getPhrasesByText } from '../api/getPhrasesByText'
import { searchBarStyles } from './styles'
import { usePhrasesStore } from '@/store/phrases'

export const SearchBar = () => {
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  const { setPhrases, setActivePhraseIndex, activePhraseIndex, activePhrase, phrases, totalPhrases, setSearchText } =
    usePhrasesStore()

  const handleSearch = () => {
    const searchText = searchInputRef.current?.value?.trim()

    if (searchText) {
      getPhrasesByText({
        search_text: searchInputRef.current?.value || '',
        page: 1,
        config: { enabled: false }
      }).then((phrasesData) => {
        setPhrases(phrasesData, true)
        setSearchText(searchText)
      })
    }
  }

  const handleChangePhrase = (index: number) => {
    const currentPhrasesLength = phrases.length
    setActivePhraseIndex(index)

    if (currentPhrasesLength < totalPhrases && currentPhrasesLength - index <= PHRASES_PAGE_SIZE) {
      // TODO: UPDATE TO NOT WAIT FOR NEW PHRASES WHILE CHANGING PHRASE
      getPhrasesByText({
        search_text: searchInputRef.current?.value || '',
        page: Math.floor(index / PHRASES_PAGE_SIZE) + 2,
        config: { enabled: false }
      }).then((phrasesData) => {
        setPhrases(phrasesData, false)
      })
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
          <IconButton type="button" sx={searchBarStyles.iconButton} aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => handleChangePhrase(activePhraseIndex - 1)}
            sx={searchBarStyles.iconButton}
            aria-label="previous"
            disabled={activePhraseIndex === 0 || !activePhrase}>
            <SkipPreviousIcon />
          </IconButton>
          <Typography variant="body1" sx={searchBarStyles.itemCounterText}>
            {activePhrase ? activePhraseIndex + 1 : 0} / {totalPhrases}
          </Typography>
          <IconButton
            type="button"
            onClick={() => handleChangePhrase(activePhraseIndex + 1)}
            sx={searchBarStyles.iconButton}
            aria-label="next"
            disabled={activePhraseIndex === phrases.length - 1 || !activePhrase}>
            <SkipNextIcon />
          </IconButton>
          <IconButton
            component="a"
            href={activePhrase?.scene_s3_key}
            aria-label="download"
            disabled={!activePhrase}
            sx={searchBarStyles.iconButton}>
            <FileDownloadIcon />
          </IconButton>
        </Paper>
      </FormControl>
    </Container>
  )
}
