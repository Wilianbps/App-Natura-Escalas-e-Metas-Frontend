import { SettingsProvider } from './setting/SettingContext'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>
}
