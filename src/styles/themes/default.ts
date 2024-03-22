/* eslint-disable @typescript-eslint/naming-convention */

import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    white: React.CSSProperties['color']
    red: React.CSSProperties['color']
    black: React.CSSProperties['color']
    yellowLight: React.CSSProperties['color']
    orangeDark: React.CSSProperties['color']
  }
  interface ThemeOptions {
    white: React.CSSProperties['color']
    red: React.CSSProperties['color']
    black: React.CSSProperties['color']
    yellowLight: React.CSSProperties['color']
    orangeDark: React.CSSProperties['color']
  }
}

export const defaultTheme = createTheme({
  white: '#fff',
  red: 'red',
  black: 'black',

  yellowLight: '#F6EBCF',

  orangeDark: '#FF9E00',

  typography: {
    fontFamily: 'Montserrat',
  },
  palette: {
    primary: {
      main: '#FF9E00', // Definir a cor primária para vermelho
    },
  },
})
