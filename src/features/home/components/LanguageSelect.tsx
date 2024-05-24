import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import React from 'react'
import { languageSelectStyles } from './styles'

export const LanguageSelect = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>('en')
  const [openedSelect, setOpenedSelect] = React.useState<boolean>(false)

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setSelectedLanguage(event.target.value)
  }

  return (
    <FormControl>
      <Select
        value={selectedLanguage}
        onClick={(e) => {
          e.preventDefault()
          setOpenedSelect((state) => !state)
        }}
        onChange={handleLanguageChange}
        open={openedSelect}
        id="language-dropdown"
        sx={languageSelectStyles.select}>
        <MenuItem value="en">
          <Box display="flex" alignItems="center">
            EN
          </Box>
        </MenuItem>
        <MenuItem value="de">
          <Box display="flex" alignItems="center">
            DE
          </Box>
        </MenuItem>
        <MenuItem value="ua">
          <Box display="flex" alignItems="center">
            UA
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
