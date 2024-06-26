import { createContext, useContext, useEffect, useState } from 'react'

import { api } from '@/services/axios'

import { useSettings } from '../setting/SettingContext'
import { GoalsContextType, GoalsProviderProps, IGoals } from './interfaces'

const GoalsContext = createContext({} as GoalsContextType)

function GoalsProvider({ children }: GoalsProviderProps) {
  const [goals, setGoals] = useState<Array<IGoals[]>>([])

  const { monthValue } = useSettings()

  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  async function fetchGoals() {
    const response = await api.get(
      `goals/get-goals-by-fortnight?month=${month}&year=${year}`,
    )
    setGoals(response.data)
  }

  useEffect(() => {
    fetchGoals()
  }, [monthValue])

  return (
    <GoalsContext.Provider value={{ goals, fetchGoals }}>
      {children}
    </GoalsContext.Provider>
  )
}

function useGoals() {
  const context = useContext(GoalsContext)
  return context
}

export { GoalsContext, GoalsProvider, useGoals }
