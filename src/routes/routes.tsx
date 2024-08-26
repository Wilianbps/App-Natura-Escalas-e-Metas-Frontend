import { createBrowserRouter, useRouteError } from 'react-router-dom'

import { AppLayout } from '@/pages/_Layouts'
import { Dashboard } from '@/pages/Dashboard'
import { Employees } from '@/pages/Employees'
import { Goals } from '@/pages/Goals'
import { ScalePage } from '@/pages/Scales'

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
      { path: '/escalas', element: <ScalePage /> },
      { path: '/metas', element: <Goals /> },
      { path: '/configuracoes', element: <Employees /> },
    ],
  },
])
