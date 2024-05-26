import { Box, IconButton, Typography } from '@mui/material'

import { PHRASES_PAGE_SIZE } from '@/config'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import React from 'react'
import ReactPlayer from 'react-player'
import { getPhrasesByText } from '../api/getPhrasesByText'
import { usePhrasesStore } from '@/store/phrases'
import { videoPlayerStyles } from './styles'

export const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true)
  const { activePhrase, setActivePhraseIndex, activePhraseIndex, phrases, totalPhrases, searchText, setPhrases } =
    usePhrasesStore()

  const togglePauseVideo = React.useCallback(() => {
    if (activePhrase) {
      setIsPlaying((prevPlaying) => !prevPlaying)
    }
  }, [setIsPlaying, activePhrase])

  // TODO: set pause if no next video
  // TODO: resolve playing when new videos loaded, but it was paused due to loading time
  const playNextVideo = () => {
    const currentPhrasesLength = phrases.length
    const nextIndex = activePhraseIndex + 1
    setActivePhraseIndex(nextIndex)

    if (currentPhrasesLength < totalPhrases && currentPhrasesLength - nextIndex <= PHRASES_PAGE_SIZE) {
      // TODO: UPDATE TO NOT WAIT FOR NEW PHRASES WHILE CHANGING PHRASE
      getPhrasesByText({
        search_text: searchText,
        page: Math.floor(nextIndex / PHRASES_PAGE_SIZE) + 2,
        config: { enabled: false }
      }).then((phrasesData) => {
        setPhrases(phrasesData, false)
      })
    }
  }

  return (
    <Box sx={videoPlayerStyles.playerBox}>
      {activePhrase && !isPlaying ? (
        <IconButton type="button" sx={videoPlayerStyles.pauseButton} aria-label="play" onClick={togglePauseVideo}>
          <PlayCircleFilledWhiteIcon sx={videoPlayerStyles.pauseIcon} />
        </IconButton>
      ) : (
        <></>
      )}
      <ReactPlayer
        className="react-player"
        playing={isPlaying}
        onEnded={playNextVideo}
        onClick={togglePauseVideo}
        url={activePhrase?.scene_s3_key}
        style={{ cursor: 'pointer' }}
      />
      <Box sx={videoPlayerStyles.subtitleBox}>
        {activePhrase?.full_text.split('\n').map((line, index) => (
          <Typography key={index} variant="body1" sx={videoPlayerStyles.subtitleText}>
            {line}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
