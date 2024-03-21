import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_Layouts'
import { Dashboard } from '@/pages/Dashboard'
import { Employees } from '@/pages/Employees'
import { Goals } from '@/pages/Goals'
import { Scales } from '@/pages/Scales'
import { Simulator } from '@/pages/Simulator'

export const router = createBrowserRouter([
  {
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
