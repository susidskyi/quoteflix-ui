import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import { INSTAGRAM_URL, YOUTUBE_URL } from '@/config'
import { appHeaderStyles, appLogoStyles } from './styles'

import InstagramIcon from '@mui/icons-material/Instagram'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube'

const SocialLinks = () => {
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Youtube" enterDelay={300}>
        <IconButton component="a" color="inherit" href={YOUTUBE_URL} target="_blank" rel="noopener">
          <YouTubeIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Instagram" enterDelay={300}>
        <IconButton component="a" color="inherit" href={INSTAGRAM_URL} target="_blank" rel="noopener">
          <InstagramIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

type NavigationItem = {
  name: string
  path: string
}

const MenuLinks = () => {
  const navigation: NavigationItem[] = [
    {
      name: 'About',
      path: '/about'
    },
    {
      name: 'Contact',
      path: '/contact'
    }
  ]
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <>
      <Box sx={appHeaderStyles.headerBox}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit">
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={appHeaderStyles.mobileMenu}>
          {navigation.map((page: NavigationItem) => (
            <MenuItem key={page.name} onClick={handleCloseNavMenu}>
              <Button component="a" href={page.path}>
                <Typography textAlign="center">{page.name}</Typography>
              </Button>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={appHeaderStyles.menu}>
        {navigation.map((page: NavigationItem) => (
          <Button
            component="a"
            href={page.path}
            key={page.name}
            onClick={handleCloseNavMenu}
            sx={appHeaderStyles.navigationItemButton}>
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  )
}

export const AppHeader = () => {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a" href="/" sx={appLogoStyles.logoText}>
            LOGO
          </Typography>

          <MenuLinks />
          <Typography variant="h5" noWrap component="a" href="/" sx={appLogoStyles.logoMobileText}>
            LOGO
          </Typography>

          <SocialLinks />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
