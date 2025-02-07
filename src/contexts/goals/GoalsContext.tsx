import { format, lastDayOfMonth, parse } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
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
  const { employees } = useSettings()
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

  const [isLoadingGoalsLastTwelveMonths, setIsLoadingGoalsLastTwelveMonths] =
    useState(false)

  const [isLoadingGoalEmployeeByMonth, setIsLoadingGoalEmployeeByMonth] =
    useState(false)

  const [isLoadingGoalsByMonth, setIsLoadingGoalsByMonth] = useState(false)

  const [isLoadingGoalsByFortnight, setIsLoadingGoalsByFortnight] =
    useState(false)

  const { monthValue } = useSettings()

  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  const fetchGoalsByFortnight = useCallback(
    async (goalType?: string) => {
      setIsLoadingGoalsByFortnight(true)
      const goalTypeValue = goalType === undefined ? 'goal' : goalType

      try {
        const response = await api.get(
          `goals/get-goals-by-fortnight?storeCode=${store}&month=${month}&year=${year}&goalType=${goalTypeValue}`,
        )
        setGoals(response.data)
      } catch (error) {
        console.error('Failed to fetch goals by fortnight:', error)
      } finally {
        setIsLoadingGoalsByFortnight(false)
      }
    },
    [store, month, year, setGoals, setIsLoadingGoalsByFortnight],
  )

  const fetchGoalsByWeek = useCallback(
    async (goalType?: string) => {
      const goalTypeValue = goalType === undefined ? 'goal' : goalType

      try {
        const response = await api.get(
          `goals/get-goals-by-week?storeCode=${store}&month=${month}&year=${year}&goalType=${goalTypeValue}`,
        )
        setGoalsByWeek(response.data)
      } catch (error) {
        console.error('Failed to fetch goals by week:', error)
      }
    },
    [month, store, year, setGoalsByWeek],
  )

  async function fetchGoalsByMonth() {
    setIsLoadingGoalsByMonth(true)
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
        setIsLoadingGoalsByMonth(false)
      })
  }

  async function fetchGoalEmployeeByMonth() {
    setIsLoadingGoalEmployeeByMonth(true)
    await api
      .get(
        `goals/get-goals-employees-by-month?storeCode=${store}&month=${month}&year=${year}`,
      )
      .then((response) => {
        setGoalEmployeeByMonth(response.data)
        setIsLoadingGoalEmployeeByMonth(false)
      })
  }

  async function fetchRankingGoalsLastTwelveMonths() {
    setIsLoadingGoalsLastTwelveMonths(true)
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
        setIsLoadingGoalsLastTwelveMonths(false)
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
  }, [monthValue, store, employees])

  return (
    <GoalsContext.Provider
      value={{
        goals,
        fetchGoalsByFortnight,
        fetchGoalsByWeek,
        goalsByWeek,
        goalsByMonth,
        goalEmployeeByMonth,
        rankingGoalsLastTwelveMonths,
        isLoadingGoalsLastTwelveMonths,
        isLoadingGoalEmployeeByMonth,
        isLoadingGoalsByMonth,
        isLoadingGoalsByFortnight,
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
  const fetchGoalsByWeek = useContextSelector(
    GoalsContext,
    (context) => context.fetchGoalsByWeek,
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

  const isLoadingGoalsLastTwelveMonths = useContextSelector(
    GoalsContext,
    (context) => context.isLoadingGoalsLastTwelveMonths,
  )

  const isLoadingGoalEmployeeByMonth = useContextSelector(
    GoalsContext,
    (context) => context.isLoadingGoalEmployeeByMonth,
  )

  const isLoadingGoalsByMonth = useContextSelector(
    GoalsContext,
    (context) => context.isLoadingGoalsByMonth,
  )

  const isLoadingGoalsByFortnight = useContextSelector(
    GoalsContext,
    (context) => context.isLoadingGoalsByFortnight,
  )

  return {
    goals,
    fetchGoalsByFortnight,
    fetchGoalsByWeek,
    goalsByWeek,
    goalsByMonth,
    goalEmployeeByMonth,
    rankingGoalsLastTwelveMonths,
    isLoadingGoalsLastTwelveMonths,
    isLoadingGoalEmployeeByMonth,
    isLoadingGoalsByMonth,
    isLoadingGoalsByFortnight,
  }
}

export { GoalsContext, GoalsProvider, useGoals }
