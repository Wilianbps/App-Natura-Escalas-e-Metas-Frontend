export interface SettingProviderProps {
  children: React.ReactNode
}

export interface IEmployee {
  idSeler?: number
  idDayOff?: number
  storeCode?: string
  userLogin?: string
  name?: string
  status?: boolean
  office?: string
  idShift?: number
  shift: string | null
  startTime?: string
  finishTime?: string
  startVacation: string | null
  finishVacation: string | null
  arrayDaysOff?: {
    id?: number
    date: string | null
    type?: string
  }[]
  arrayVacation?: {
    id?: number
    startVacation: string | null
    finishVacation: string | null
    type?: string
  }[]
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
