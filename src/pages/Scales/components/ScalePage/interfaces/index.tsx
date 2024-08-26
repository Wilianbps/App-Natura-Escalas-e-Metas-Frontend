export interface IScale {
  id: number
  name: string
  date: Date
  turn: string
  status: boolean
  options: { id: number; type: string }[]
  infos?: {
    type?: string
    values?: number[] | string[]
  }
}
