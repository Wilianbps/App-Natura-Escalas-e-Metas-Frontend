import { createBrowserRouter, useRouteError } from 'react-router-dom'

import { AppLayout } from '@/pages/_Layouts'
import { Dashboard } from '@/pages/Dashboard'
import { Employees } from '@/pages/Employees'
import { Goals } from '@/pages/Goals'
import { Scales } from '@/pages/Scales'
import { Simulator } from '@/pages/Simulator'

function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>
}

export const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/escalas', element: <Scales /> },
      { path: '/metas', element: <Goals /> },
      { path: '/colaboradores', element: <Employees /> },
      { path: '/simulador', element: <Simulator /> },
    ],
  },
])
