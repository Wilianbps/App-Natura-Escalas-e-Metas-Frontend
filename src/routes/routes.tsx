import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/'
import { Dashboard } from '@/pages/dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Dashboard /> }],
  },
])
