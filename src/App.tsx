import { ThemeProvider } from '@emotion/react'

import { Dashboard } from './pages/dashboard'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Dashboard />
    </ThemeProvider>
  )
}
