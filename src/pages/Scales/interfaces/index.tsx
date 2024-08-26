export interface IScale {
  turns: {
    id: number
    name: string
    turn: string
    status: boolean
    options: { id: number; type: string }[]
  }[]
  infos: {
    type: string
    values: number[] | string[]
  }[]
}
