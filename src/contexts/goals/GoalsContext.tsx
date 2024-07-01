import { createContext, useContext, useEffect, useState } from 'react'

import { api } from '@/services/axios'

import { useSettings } from '../setting/SettingContext'
import {
  GoalsContextType,
  GoalsProviderProps,
  IGoals,
  IGoalsByWeek,
} from './interfaces'

const GoalsContext = createContext({} as GoalsContextType)

function GoalsProvider({ children }: GoalsProviderProps) {
  const [goals, setGoals] = useState<Array<IGoals[]>>([])
  const [goalsByWeek, setGoalsByWeek] = useState<IGoalsByWeek>(
    {} as IGoalsByWeek,
  )

  const { monthValue } = useSettings()

  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  async function fetchGoals() {
    const response = await api.get(
      `goals/get-goals-by-fortnight?month=${month}&year=${year}`,
    )
    setGoals(response.data)
  }

  async function fetchGoalsByWeek() {
    const response = await api.get(
      `goals/get-goals-by-week?month=${month}&year=${year}`,
    )
    setGoalsByWeek(response.data)
  }

  useEffect(() => {
    fetchGoals()
    fetchGoalsByWeek()
  }, [monthValue])

  return (
    <GoalsContext.Provider value={{ goals, fetchGoals, goalsByWeek }}>
      {children}
    </GoalsContext.Provider>
  )
}

function useGoals() {
  const context = useContext(GoalsContext)
  return context
}

export { GoalsContext, GoalsProvider, useGoals }
