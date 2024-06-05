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

export interface ScalesContextType {
  fetchScaleByDate: (date: string) => void
  updateSetScalesByDate: (scale: IScale[]) => void
  updateScalesByDate: (scale: IScale[]) => void
  scalesByDate: IScale[]
}
