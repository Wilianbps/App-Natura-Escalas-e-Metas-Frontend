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
  /* arrayDaysOff: Date[] | string[] */
  arrayDaysOff?: {
    id?: number
    date: string | null
    type?: string
  }[]
  flowScale?: string
}

export interface IArrayDaysOff {
  id?: number | string
  date: Date | null
  type?: string
}

export interface ModalEditEmployeeProps {
  open: boolean
  onHandleClose: () => void
  employee: IEmployee | undefined
}

export interface IModalEmployee {
  workShift: string
}

export interface infoEmployeeProps {
  selectedShift: string | null
}
