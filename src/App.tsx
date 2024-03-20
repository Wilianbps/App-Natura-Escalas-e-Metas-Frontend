import { Global, ThemeProvider } from '@emotion/react'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes/routes'
import { globalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
