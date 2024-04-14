import * as React from 'react'
import { AppHeader } from './AppHeader'

type MainLayoutProps = {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
    </>
  )
}
