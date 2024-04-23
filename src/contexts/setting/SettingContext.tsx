import { createContext, useContext } from 'react'

import { SettingProviderProps } from './interfaces'

const SettingsContext = createContext({})

function SettingsProvider({ children }: SettingProviderProps) {
  return (
    <SettingsContext.Provider value={{}}>{children}</SettingsContext.Provider>
  )
}

function useSettings() {
  const context = useContext(SettingsContext)
  return context
}

export { SettingsContext, SettingsProvider, useSettings }
