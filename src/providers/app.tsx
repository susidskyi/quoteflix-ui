import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { queryClient } from '@/lib/react-query'
import { theme } from '@/theme'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>{children}</Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
