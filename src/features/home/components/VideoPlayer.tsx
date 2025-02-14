import { Box, IconButton } from '@mui/material'

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import React from 'react'
import ReactPlayer from 'react-player'
import { Subtitles } from './Subtitles'
import { usePhrasesStore } from '@/store/phrases'
import { videoPlayerStyles } from './styles'

export const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true)
  const { activePhrase, setActivePhraseIndex, activePhraseIndex, totalPhrases } = usePhrasesStore()

  const togglePauseVideo = React.useCallback(() => {
    if (activePhrase) {
      setIsPlaying((prevPlaying) => !prevPlaying)
    }
  }, [setIsPlaying, activePhrase])

  const playNextVideo = () => {
    const nextIndex = activePhraseIndex + 1
    if (nextIndex === totalPhrases) {
      setIsPlaying(false)
    }
    setActivePhraseIndex(nextIndex)
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
      {activePhrase && <Subtitles activePhrase={activePhrase} />}
    </Box>
  )
}
