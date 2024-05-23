import React from 'react'
import { Container, FormControl, IconButton, InputBase, Paper, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { SkipNext as SkipNextIcon, SkipPrevious as SkipPreviousIcon } from '@mui/icons-material'
import { usePhrasesStore } from '@/store/phrases'
import { LanguageSelect } from './LanguageSelect'
import { getPhrasesByText } from '../api/getPhrasesByText'
import { searchBarStyles } from './styles'

export const SearchBar = () => {
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  const { setPhrases, setActivePhraseIndex, activePhraseIndex, activePhrase, phrases } = usePhrasesStore()

  const handleSearch = () => {
    getPhrasesByText({
      search_text: searchInputRef.current?.value || '',
      config: { enabled: false }
    }).then((data) => {
      if (data?.length) {
        setPhrases(data)
        setActivePhraseIndex(0)
      }
    })
  }

  const handleChangePhrase = (index: number) => {
    setActivePhraseIndex(index)
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
            placeholder="Type a phrase"
            inputProps={{ 'aria-label': 'search google maps' }}
            inputRef={searchInputRef}
          />
          <IconButton type="button" sx={searchBarStyles.iconButton} aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => handleChangePhrase(activePhraseIndex - 1)}
            sx={searchBarStyles.iconButton}
            aria-label="search"
            disabled={activePhraseIndex === 0 || !activePhrase}>
            <SkipPreviousIcon />
          </IconButton>
          <Typography variant="body1" sx={searchBarStyles.itemCounterText}>
            {activePhrase ? activePhraseIndex + 1 : 0} / {phrases.length}
          </Typography>
          <IconButton
            type="button"
            onClick={() => handleChangePhrase(activePhraseIndex + 1)}
            sx={searchBarStyles.iconButton}
            aria-label="search"
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
