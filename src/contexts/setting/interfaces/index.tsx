export interface SettingProviderProps {
  children: React.ReactNode
}

export interface IEmployee {
  idSeler?: number
  idDayOff?: number
  storeCode?: string
  userLogin?: string
  name?: string
  cpf?: string | null
  newUser?: boolean | null
  status?: boolean
  office?: string
  idShift?: number
  shift: string | null
  startTime?: string
  lunchTime?: string
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

interface ShiftProps {
  startTime: string
  endTime: string
}

export interface IShifts {
  morning: ShiftProps
  afternoon: ShiftProps
  nocturnal: ShiftProps
}

export interface IInfoEmployee {
  name: string
  position: string
  cpf?: string
  startDate: Date | null
  selectedShift: number | false
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
  shifts: IShifts
  updateSettingShifts: (shifts: IShifts) => void
  updateSettings: (settings: ISettings) => void
  updateselectDate: (date: Date | null) => void
  selectedDate: Date | null
  fetchEmployes: () => void
  monthValue: string
  isLoadingEmployees: boolean
  updateMonthValue: (month: string) => void
  addEmployee: (employee: IInfoEmployee) => void
  updateEmployee: (id: number | undefined, employee: IInfoEmployee) => void
  deleteEmployee: (id: number | undefined) => void
}
