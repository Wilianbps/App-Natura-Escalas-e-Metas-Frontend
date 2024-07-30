export interface IScale {
  id: number
  name: string
  date: Date
  turn: string
  status: boolean
  activeDays?: number
  options: { id: number; type: string }[]

  info?: {
    type?: string
    values?: number[] | string[]
  }
}

export interface IScaleProps {
  id: number
  date: string
  turn: number | null
  status: number
  options: { id: number; type: string }[]
}

export interface IScaleSummary {
  id: string
  name: string
  dayOfWeek: number
  days: {
    date: string
    day: string
    month: string
    year: string
    turnId: number
    status: number
    startTime: string
    endTime: string
    dayOfWeek: number
    turn: string
  }[]
}

export interface IDataFinishScale {
  storeCode: string
  loginUser: string
  startDate: string
  endDate: string
  finished: number
}

export type DataType = {
  [key: string]: number | null
}
export interface ScalesContextType {
  fetchScaleByDate: (date: string) => void
  updateSetScalesByDate: (scale: IScale[]) => void
  updateScalesByDate: (scale: IScale[]) => void
  fetchLoadMonthScale: (date: string) => void
  fetchInputFlow: (date: string) => void
  updateGetCurrenDate: (date: string) => void
  scalesByDate: IScale[]
  scaleSummary: Array<IScaleSummary[]>
  inputFlow: DataType[]
  dataFinishScale: IDataFinishScale[]
}
