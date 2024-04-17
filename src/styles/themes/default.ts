/* eslint-disable @typescript-eslint/naming-convention */

import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    white: React.CSSProperties['color']
    red: React.CSSProperties['color']
    black: React.CSSProperties['color']
    yellow: React.CSSProperties['color']
    yellowLight: React.CSSProperties['color']
    yellowMedium: React.CSSProperties['color']
    orangeMedium: React.CSSProperties['color']
    orangeDark: React.CSSProperties['color']
    beigeDark: React.CSSProperties['color']
    grayLight: React.CSSProperties['color']
    gray: React.CSSProperties['color']
    blueLight: React.CSSProperties['color']
    greenLight: React.CSSProperties['color']
    greenMedium: React.CSSProperties['color']
    brown: React.CSSProperties['color']
  }
  interface ThemeOptions {
    white: React.CSSProperties['color']
    red: React.CSSProperties['color']
    black: React.CSSProperties['color']
    yellow: React.CSSProperties['color']
    yellowLight: React.CSSProperties['color']
    yellowMedium: React.CSSProperties['color']
    orangeMedium: React.CSSProperties['color']
    orangeDark: React.CSSProperties['color']
    beigeDark: React.CSSProperties['color']
    grayLight: React.CSSProperties['color']
    gray: React.CSSProperties['color']
    blueLight: React.CSSProperties['color']
    greenLight: React.CSSProperties['color']
    greenMedium: React.CSSProperties['color']
    brown: React.CSSProperties['color']
  }
}

export const defaultTheme = createTheme({
  white: '#fff',
  red: 'red',
  black: 'black',

  yellow: '#F8E32B',
  yellowLight: '#F6EBCF',

  yellowMedium: '#ffe2b3',

  orangeMedium: '#FFB84D',
  orangeDark: '#FF9E00',

  beigeDark: '#D58400',

  blueLight: '#B0D3F3',

  gray: '#C8C8C8',
  grayLight: '#F4F4F4',

  greenMedium: '#449428',
  greenLight: '#e2d34c',

  brown: '#B77100',

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
