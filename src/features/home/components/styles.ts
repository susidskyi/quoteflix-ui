// TODO: rewrite styles

export const searchBarStyles = {
  formControl: {
    marginTop: 1,
    height: 52
  },
  inputBase: {
    ml: 1,
    flex: 1
  },
  formPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  iconButton: {
    padding: '10px'
  },
  itemCounterText: {
    fontWeight: 'bold',
    color: '#757575'
  }
}

export const languageSelectStyles = {
  select: {
    fieldset: {
      border: 'none'
    },
    '& .MuiSelect-select': {
      pt: 0,
      pb: 0
    },
    zIndex: 99999,
    p: 0,
    m: 0
  }
}

export const videoPlayerStyles = {
  playerBox: {
    position: 'relative',
    height: 'calc(100vh - 129px)',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#202124',
    '& video': {
      height: '100% !important',
      width: 'auto !important',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  },
  player: {
    height: '100% !important',
    width: '100vw !important',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999
  },
  pauseButton: {
    zIndex: 9999,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  pauseIcon: {
    fontSize: '15vh',
    color: 'white',
    opacity: 0.9,
    zIndex: 9999
  }
}

export const subtitlesStyles = {
  subtitleBox: {
    position: 'absolute',
    bottom: '4%',
    left: '50%',
    maxWidth: '90%',
    width: 'max-content',
    transform: 'translate(-50%, -4%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '5px 10px',
    borderRadius: '5px',
    textAlign: 'center'
  },
  subtitleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0.8,
    fontSize: '1.5rem',
    color: '#fafafa'
  },
  matchedSubtitleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0.8,
    fontSize: '1.5rem',
    color: '#FFFF00'
  },
  movieTitle: {
    textAlign: 'center',
    opacity: 0.8,
    color: '#ffffff',
    borderTop: '1px solid #ffffff',
    padding: '3px 5px 3px 5px',
    fontSize: '16px'
  }
}
