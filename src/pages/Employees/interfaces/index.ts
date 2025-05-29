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
  extraEmployee?: boolean
}
