export interface GoalsProviderProps {
  children: React.ReactNode
}

export interface IGoals {
  id: string
  name: string
  codeStore: string
  activeSeller: boolean
  days: {
    date: string
    goalDay: number | string
    goalDayByEmployee: number | string
  }[]
}

export interface IGoalsByWeek {
  employeesByWeeks: {
    id: string
    name: string
    codeStore: string
    activeSeller: boolean
    totalAmountMonth: number
    weeks: {
      days: {
        id: string
        codeStore: string
        name: string
        date: string
        goalDay: number | string
        goalDayByEmployee: number | string
      }
      amountWeek: number
    }[]
  }[]
  weeksSums: number[]
}

export type GoalType = 'HIPER_META' | 'META' | 'SUPER_META'

export interface IGoalsByMonth {
  goalValue: number
  goalType: GoalType
}

export interface IGoalEmployeeByMonth {
  id: string
  name: string
  metas: number
}

export interface IRankingGoalsLastTwelveMonths {
  name: string
  hiperMeta: number
  superMeta: number
  meta: number
}

export interface GoalsContextType {
  goals: Array<IGoals[]>
  fetchGoalsByFortnight: (goalType?: string) => void
  fetchGoalsByWeek: (goalType?: string) => void
  goalsByWeek: IGoalsByWeek
  goalsByMonth: IGoalsByMonth[]
  goalEmployeeByMonth: IGoalEmployeeByMonth[]
  rankingGoalsLastTwelveMonths: IRankingGoalsLastTwelveMonths[]
  isLoadingGoalsLastTwelveMonths: boolean
  isLoadingGoalEmployeeByMonth: boolean
  isLoadingGoalsByMonth: boolean
  isLoadingGoalsByFortnight: boolean
}
