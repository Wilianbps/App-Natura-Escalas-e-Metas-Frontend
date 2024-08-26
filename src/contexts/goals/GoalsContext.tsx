import { format, lastDayOfMonth, parse } from 'date-fns'
import { useEffect, useState } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

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
  const { store } = useProfiles()
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
        `goals/get-goals-by-fortnight?storeCode=${store}&month=${month}&year=${year}`,
      )
      .then((response) => {
        setGoals(response.data)
      })
  }

  async function fetchGoalsByWeek() {
    await api
      .get(
        `goals/get-goals-by-week?storeCode=${store}&month=${month}&year=${year}`,
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
        `goals/get-goals-by-month?storeCode=${store}&initialDate=${formattedInitialDate}&lastDate=${formattedLastDate}`,
      )
      .then((response) => {
        setGoalsByMonth(response.data)
      })
  }

  async function fetchGoalEmployeeByMonth() {
    await api
      .get(
        `goals/get-goals-employees-by-month?storeCode=${store}&month=${month}&year=${year}`,
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
        `goals/get-ranking-goals-last-twelve-months?storeCode=${store}&initialDate=${formattedInitialDate}&lastDate=${formattedLastDate}`,
      )
      .then((response) => {
        setRankingGoalsLastTwelveMonths(response.data)
      })
  }

  useEffect(() => {
    if (store) {
      fetchGoalsByFortnight()
      fetchGoalsByWeek()
      fetchGoalsByMonth()
      fetchGoalEmployeeByMonth()
      fetchRankingGoalsLastTwelveMonths()
    }
  }, [monthValue, store, fetchEmployes])

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
  const goals = useContextSelector(GoalsContext, (context) => context.goals)
  const fetchGoalsByFortnight = useContextSelector(
    GoalsContext,
    (context) => context.fetchGoalsByFortnight,
  )
  const goalsByWeek = useContextSelector(
    GoalsContext,
    (context) => context.goalsByWeek,
  )
  const goalsByMonth = useContextSelector(
    GoalsContext,
    (context) => context.goalsByMonth,
  )
  const goalEmployeeByMonth = useContextSelector(
    GoalsContext,
    (context) => context.goalEmployeeByMonth,
  )
  const rankingGoalsLastTwelveMonths = useContextSelector(
    GoalsContext,
    (context) => context.rankingGoalsLastTwelveMonths,
  )

  return {
    goals,
    fetchGoalsByFortnight,
    goalsByWeek,
    goalsByMonth,
    goalEmployeeByMonth,
    rankingGoalsLastTwelveMonths,
  }
}

export { GoalsContext, GoalsProvider, useGoals }
