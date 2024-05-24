import { Box, IconButton } from '@mui/material'

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import React from 'react'
import ReactPlayer from 'react-player'
import { usePhrasesStore } from '@/store/phrases'
import { videoPlayerStyles } from './styles'

export const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
  const { activePhrase, setActivePhraseIndex, activePhraseIndex } = usePhrasesStore()

  const togglePauseVideo = () => {
    if (activePhrase) {
      setIsPlaying((prevPlaying) => !prevPlaying)
    }
  }

  const playNextVideo = () => {
    setActivePhraseIndex(activePhraseIndex + 1)
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
      />
    </Box>
  )
}
