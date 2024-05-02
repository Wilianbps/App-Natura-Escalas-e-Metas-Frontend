export interface SettingProviderProps {
  children: React.ReactNode
}

export interface IEmployee {
  idSeler?: number
  name?: string
  status?: boolean
  office?: string
  idShift?: string
  shift: string | null
  startTime?: string
  finishTime?: string
  startVacation: string | null
  finishVacation: string | null
  arrayDaysOff: Date[] | string[]
  flowScale?: string
}

interface IEmployeStatus {
  idSeler: number | undefined
  status: boolean
}

export interface ISettings {
  employeeStatus: IEmployeStatus[]
  flowScale: string
}

export interface SettingsContextType {
  updateShiftRestSchedule: (employee: IEmployee) => void
  employees: IEmployee[]
  updateSettings: (settings: ISettings) => void
}
