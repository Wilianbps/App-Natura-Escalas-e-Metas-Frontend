import type { StartHoursType } from '../hours'

export interface ModalEditEmployeeProps {
  open: boolean
  onHandleClose: () => void
}

export type ShiftKey = 'morning' | 'afternoon' | 'nocturnal'
export type ShiftProperty = 'startTime' | 'endTime'

interface ShiftProps {
  id: string
  turn: string
  startTime: StartHoursType
  endTime: StartHoursType
}

export type FormProps = {
  morning: ShiftProps
  afternoon: ShiftProps
  nocturnal: ShiftProps
}
