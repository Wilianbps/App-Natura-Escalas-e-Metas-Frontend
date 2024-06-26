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

export interface GoalsContextType {
  goals: Array<IGoals[]>
  fetchGoals: () => void
}
