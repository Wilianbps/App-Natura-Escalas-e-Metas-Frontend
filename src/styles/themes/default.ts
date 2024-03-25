/* eslint-disable @typescript-eslint/naming-convention */

import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    white: React.CSSProperties['color']
    red: React.CSSProperties['color']
    black: React.CSSProperties['color']
    yellowLight: React.CSSProperties['color']
    yellowMedium: React.CSSProperties['color']
    orangeDark: React.CSSProperties['color']
    grayLight: React.CSSProperties['color']
  }
  interface ThemeOptions {
    white: React.CSSProperties['color']
    red: React.CSSProperties['color']
    black: React.CSSProperties['color']
    yellowLight: React.CSSProperties['color']
    yellowMedium: React.CSSProperties['color']
    orangeDark: React.CSSProperties['color']
    grayLight: React.CSSProperties['color']
  }
}

export const defaultTheme = createTheme({
  white: '#fff',
  red: 'red',
  black: 'black',

  yellowLight: '#F6EBCF',
  yellowMedium: '#ffe2b3',

  orangeDark: '#FF9E00',

  grayLight: '#F4F4F4',

  typography: {
    fontFamily: 'Montserrat',
  },
  palette: {
    primary: {
      main: '#FF9E00',
      dark: '#FF9E00',
    },
  },
})
