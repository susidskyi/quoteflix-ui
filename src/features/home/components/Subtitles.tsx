import { Box, Typography } from '@mui/material'

import { Phrase } from '../types'
import React from 'react'
import { subtitlesStyles } from './styles'

const SubtitleText = ({ text, styles }: { text: string; styles: any }) => {
  if (!text) return null

  const textSegments = text.split('\n')

  return (
    <>
      {textSegments.map((segment, index) => (
        <React.Fragment key={index}>
          <Typography variant="body1" component="span" sx={styles}>
            {segment}
          </Typography>
          {index < textSegments.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  )
}

export const Subtitles = ({ activePhrase }: { activePhrase: Phrase }) => {
  const { full_text: fullText, matched_phrase: matchedPhrase } = activePhrase

  const firstPart = fullText.slice(0, fullText.indexOf(matchedPhrase))
  const secondPart = fullText.slice(fullText.indexOf(matchedPhrase) + matchedPhrase.length)

  return (
    <Box sx={subtitlesStyles.subtitleBox}>
      <SubtitleText text={firstPart} styles={subtitlesStyles.subtitleText} />
      <SubtitleText text={matchedPhrase} styles={subtitlesStyles.matchedSubtitleText} />
      <SubtitleText text={secondPart} styles={subtitlesStyles.subtitleText} />
    </Box>
  )
}
