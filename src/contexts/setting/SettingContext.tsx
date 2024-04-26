import { createContext, useContext, useState } from 'react'

import { api } from '@/services/axios'

import {
  IEmployee,
  SettingProviderProps,
  SettingsContextType,
} from './interfaces'

const SettingsContext = createContext({} as SettingsContextType)

function SettingsProvider({ children }: SettingProviderProps) {
  const [infoEmployees, setInfoEmployess] = useState()

  async function updateShiftRestSchedule(employee: IEmployee) {
    const { shift, startVacation, finishVacation, arrayDaysOff } = employee

    console.log('entrou aqui', employee)

    const response = await api.put('settings/updateShiftRestSchedule', {
      shift,
      startVacation,
      finishVacation,
      arrayDaysOff,
    })
    console.log(response.data)
    setInfoEmployess(response.data)
    console.log(infoEmployees)
  }

  return (
    <SettingsContext.Provider value={{ updateShiftRestSchedule }}>
      {children}
    </SettingsContext.Provider>
  )
}

function useSettings() {
  const context = useContext(SettingsContext)
  return context
}

export { SettingsContext, SettingsProvider, useSettings }
