import React from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Tooltip,
  Stack
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import { YOUTUBE_URL, INSTAGRAM_URL } from '@/config'

const SocialLinks = () => {
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Youtube" enterDelay={300}>
        <IconButton component="a" color="inherit" href={YOUTUBE_URL} target="_blank" rel="noopener">
          <YouTubeIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Instagram" enterDelay={300}>
        <IconButton component="a" color="inherit" href={INSTAGRAM_URL} target="_blank" rel="noopener">
          <InstagramIcon fontSize="small" />
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
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
          sx={{
            display: { xs: 'block', md: 'none' }
          }}>
          {navigation.map((page: NavigationItem) => (
            <MenuItem key={page.name} onClick={handleCloseNavMenu}>
              <Button component="a" href={page.path}>
                <Typography textAlign="center">{page.name}</Typography>
              </Button>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {navigation.map((page: NavigationItem) => (
          <Button
            component="a"
            href={page.path}
            key={page.name}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}>
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
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}>
            LOGO
          </Typography>

          <MenuLinks />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}>
            LOGO
          </Typography>

          <SocialLinks />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
