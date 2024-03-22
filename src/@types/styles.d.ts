import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// Estende a interface DefaultTheme do Emotion com o tipo do seu tema padrão
declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
