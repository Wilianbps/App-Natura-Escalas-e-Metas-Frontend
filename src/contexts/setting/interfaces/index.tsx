export interface SettingProviderProps {
  children: React.ReactNode
}

export interface IEmployee {
  /*  id?: number
  shift?: string
  startVacation?: string
  finishVacation?: string
  arrayDaysOff?: [] */

  id?: number
  shift: string | null
  startVacation: string | null
  finishVacation: string | null
  arrayDaysOff: Date[] | string[]
}

export interface SettingsContextType {
  updateShiftRestSchedule: (employee: IEmployee) => void
}
