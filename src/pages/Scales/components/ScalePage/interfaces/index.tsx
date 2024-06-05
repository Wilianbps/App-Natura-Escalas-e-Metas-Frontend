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

/* export interface IScale {
  scale: [
    turns: [
      name: string,
      turn: string,
      options: {
        id: number
        type: string
      }[],
    ],
    values: [type: string, value: number[]],
  ]
} */

/* export interface IScales {
  defaultScales: [
    [
      [
        { name: string },
        { turn: string },
        { options: { id: number; type: string }[] },
      ],
    ],
    [{ type: string }, { values: [] }[]],
  ]
} */

/* export interface IScales {
  name: string
  turn: string
  options: {
    id: number
    type: string
  }
  type: string
  values: number[]
}
 */
/* export interface IScales {
  defaultScales: [
    [
      [
        { name: string },
        { turn: string },
        { options: { id: number; type: string }[] },
      ],
    ],
    [{ type: string }, { values: [] }[]],
  ]
}

const scales: IScales = {
  defaultScales: [
    [
      [
        { name: 'Scale 1' },
        { turn: 'Turn 1' },
        { options: [{ id: 1, type: 'Type 1' }] },
      ],
    ],
    [{ type: 'Type 2' }, { values: [1, 2, 3] }],
  ],
}

console.log(scales) */
