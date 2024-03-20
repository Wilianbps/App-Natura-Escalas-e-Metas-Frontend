import { ThemeProvider } from '@emotion/react'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes/routes'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
