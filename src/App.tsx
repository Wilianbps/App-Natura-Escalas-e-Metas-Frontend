import { Global, ThemeProvider } from '@emotion/react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { AppProvider } from './contexts'
import { router } from './routes/routes'
import { globalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Global styles={globalStyles} />

      <AppProvider>
        <Toaster richColors />
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  )
}
