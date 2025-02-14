import { MainLayout } from '@/components/Layout/MainLayout'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { lazyImport } from '@/utils/lazyImport'

const { Home } = lazyImport(() => import('@/features/home'), 'Home')

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<div className="h-full w-full flex items-center justify-center"></div>}>
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

export const publicRoutes = [
  {
    path: '/',
    element: <App />,
    children: [{ path: '/', element: <Home /> }]
  }
]
