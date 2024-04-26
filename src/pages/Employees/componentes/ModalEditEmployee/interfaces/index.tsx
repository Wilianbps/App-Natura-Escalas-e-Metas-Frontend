export interface ModalEditEmployeeProps {
  open: boolean
  onHandleClose: () => void
}

export interface IModalEmployee {
  workShift: string
}
export interface IEmployee {
  id?: number
  shift: string | null
  startVacation: string | null
  finishVacation: string | null
  arrayDaysOff: Date[] | string[]
}
