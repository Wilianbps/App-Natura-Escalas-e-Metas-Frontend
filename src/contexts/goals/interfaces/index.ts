export interface GoalsProviderProps {
  children: React.ReactNode
}

export interface IGoals {
  id: string
  name: string
  codeStore: string
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

export interface GoalsContextType {
  goals: Array<IGoals[]>
  goalsByWeek: IGoalsByWeek
  fetchGoals: () => void
}
