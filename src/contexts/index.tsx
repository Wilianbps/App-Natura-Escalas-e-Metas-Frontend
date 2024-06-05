import { ScalesProvider } from './scale/ScalesContext'
import { SettingsProvider } from './setting/SettingContext'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <ScalesProvider>{children}</ScalesProvider>
    </SettingsProvider>
  )
}
