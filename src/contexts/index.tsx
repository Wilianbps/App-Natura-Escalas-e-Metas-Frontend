import { GoalsProvider } from './goals/GoalsContext'
import { ProfilesProvider } from './profiles/ProfilesContext'
import { ScalesProvider } from './scale/ScalesContext'
import { SettingsProvider } from './setting/SettingContext'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ProfilesProvider>
      <SettingsProvider>
        <GoalsProvider>
          <ScalesProvider>{children}</ScalesProvider>
        </GoalsProvider>
      </SettingsProvider>
    </ProfilesProvider>
  )
}
