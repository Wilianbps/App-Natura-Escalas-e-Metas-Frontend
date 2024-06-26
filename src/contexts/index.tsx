import { GoalsProvider } from './goals/GoalsContext'
import { ScalesProvider } from './scale/ScalesContext'
import { SettingsProvider } from './setting/SettingContext'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <GoalsProvider>
        <ScalesProvider>{children}</ScalesProvider>
      </GoalsProvider>
    </SettingsProvider>
  )
}
