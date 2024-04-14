export const appHeaderStyles = {
  headerBox: {
    flexGrow: 1,
    display: { xs: 'flex', md: 'none' }
  },
  menu: {
    flexGrow: 1,
    display: { xs: 'none', md: 'flex' }
  },
  mobileMenu: {
    display: { xs: 'block', md: 'none' }
  },
  navigationItemButton: {
    my: 2,
    color: 'white',
    display: 'block'
  }
}

export const appLogoStyles = {
  logoText: {
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none'
  },
  logoMobileText: {
    mr: 2,
    display: { xs: 'flex', md: 'none' },
    flexGrow: 1,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none'
  }
}
