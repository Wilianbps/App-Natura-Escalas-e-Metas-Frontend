import { lazy, Suspense } from 'react'
import { createBrowserRouter, useRouteError } from 'react-router-dom'

import { AppLayout } from '@/pages/_Layouts'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Employees = lazy(() => import('@/pages/Employees'))
const Goals = lazy(() => import('@/pages/Goals'))
const ScalePage = lazy(() => import('@/pages/Scales'))

function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)
  return <div>Dang!</div>
}

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<div>Carregando...</div>}>{element}</Suspense>
)

export const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: withSuspense(<Dashboard />) },
      { path: '/escalas', element: withSuspense(<ScalePage />) },
      { path: '/metas', element: withSuspense(<Goals />) },
      { path: '/configuracoes', element: withSuspense(<Employees />) },
    ],
  },
])
