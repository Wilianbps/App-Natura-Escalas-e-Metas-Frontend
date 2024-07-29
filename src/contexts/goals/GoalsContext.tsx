import { format, lastDayOfMonth, parse } from 'date-fns'
import { createContext, useContext, useEffect, useState } from 'react'

import { api } from '@/services/axios'

import { useProfiles } from '../profiles/ProfilesContext'
import { useSettings } from '../setting/SettingContext'
import {
  GoalsContextType,
  GoalsProviderProps,
  IGoalEmployeeByMonth,
  IGoals,
  IGoalsByMonth,
  IGoalsByWeek,
  IRankingGoalsLastTwelveMonths,
} from './interfaces'

const GoalsContext = createContext({} as GoalsContextType)

function GoalsProvider({ children }: GoalsProviderProps) {
  const { cookieStoreCode } = useProfiles()
  const { fetchEmployes } = useSettings()
  const [goals, setGoals] = useState<Array<IGoals[]>>([])
  const [goalsByWeek, setGoalsByWeek] = useState<IGoalsByWeek>(
    {} as IGoalsByWeek,
  )
  const [goalsByMonth, setGoalsByMonth] = useState<IGoalsByMonth[]>([])
  const [goalEmployeeByMonth, setGoalEmployeeByMonth] = useState<
    IGoalEmployeeByMonth[]
  >([])

  const [rankingGoalsLastTwelveMonths, setRankingGoalsLastTwelveMonths] =
    useState<IRankingGoalsLastTwelveMonths[]>([])

  const { monthValue } = useSettings()

  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  async function fetchGoalsByFortnight() {
    await api
      .get(
        `goals/get-goals-by-fortnight?storeCode=${cookieStoreCode}&month=${month}&year=${year}`,
      )
      .then((response) => {
        setGoals(response.data)
      })
  }

  async function fetchGoalsByWeek() {
    await api
      .get(
        `goals/get-goals-by-week?storeCode=${cookieStoreCode}&month=${month}&year=${year}`,
      )
      .then((response) => {
        setGoalsByWeek(response.data)
      })
  }

  async function fetchGoalsByMonth() {
    const initialDate = parse(`01/${month}/${year}`, 'dd/MM/yyyy', new Date())
    const lastDate = lastDayOfMonth(initialDate)
    const formattedInitialDate = format(initialDate, 'yyyyMMdd')
    const formattedLastDate = format(lastDate, 'yyyyMMdd')

    await api
      .get(
        `goals/get-goals-by-month?storeCode=${cookieStoreCode}&initialDate=${formattedInitialDate}&lastDate=${formattedLastDate}`,
      )
      .then((response) => {
        setGoalsByMonth(response.data)
      })
  }

  async function fetchGoalEmployeeByMonth() {
    await api
      .get(
        `goals/get-goals-employees-by-month?storeCode=${cookieStoreCode}&month=${month}&year=${year}`,
      )
      .then((response) => {
        setGoalEmployeeByMonth(response.data)
      })
  }

  async function fetchRankingGoalsLastTwelveMonths() {
    const initialDate = parse(`01/${month}/${year}`, 'dd/MM/yyyy', new Date())
    const lastDate = lastDayOfMonth(initialDate)
    const formattedInitialDate = format(initialDate, 'yyyyMMdd')
    const formattedLastDate = format(lastDate, 'yyyyMMdd')

    await api
      .get(
        `goals/get-ranking-goals-last-twelve-months?storeCode=${cookieStoreCode}&initialDate=${formattedInitialDate}&lastDate=${formattedLastDate}`,
      )
      .then((response) => {
        setRankingGoalsLastTwelveMonths(response.data)
      })
  }

  useEffect(() => {
    if (cookieStoreCode) {
      fetchGoalsByFortnight()
      fetchGoalsByWeek()
      fetchGoalsByMonth()
      fetchGoalEmployeeByMonth()
      fetchRankingGoalsLastTwelveMonths()
    }
  }, [monthValue, fetchEmployes])

  return (
    <GoalsContext.Provider
      value={{
        goals,
        fetchGoalsByFortnight,
        goalsByWeek,
        goalsByMonth,
        goalEmployeeByMonth,
        rankingGoalsLastTwelveMonths,
      }}
    >
      {children}
    </GoalsContext.Provider>
  )
}

function useGoals() {
  const context = useContext(GoalsContext)
  return context
}

export { GoalsContext, GoalsProvider, useGoals }
