export interface IScale {
  id: number
  name: string
  date: Date
  turn: string
  status: boolean
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

/* export interface IScaleSummary {
  id: string
  name: string
  date: string
  turnId: number
  status: number
  startTime: string
  endTime: string
  dayOfWeek: number
} */

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
  }[]
}

export interface ScalesContextType {
  fetchScaleByDate: (date: string) => void
  updateSetScalesByDate: (scale: IScale[]) => void
  updateScalesByDate: (scale: IScale[]) => void
  scalesByDate: IScale[]
  scaleSummary: Array<IScaleSummary[]>
}
