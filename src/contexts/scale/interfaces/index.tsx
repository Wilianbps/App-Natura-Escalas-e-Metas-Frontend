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
    lunchTime: string
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
  finished: boolean
}

export interface IScaleApprovalRequest {
  id: string
  storeCode: string
  description: string
  responsible: string
  branch: string
  requestDate: string
  approvalDate?: string
  status: number
}

export type DataType = {
  [key: string]: number | null
}

export interface IParamGenerateScaleNextMonth {
  day: string
  status: number
}

export interface IParamToAlterDayScale {
  day: string
  status: number
}

export interface IStoresScaleStatus {
  scaleCode: string
  branch: string
  userLogin: string
  date: string
  status: string
}

export interface ScalesContextType {
  fetchScaleByDate: (date: string) => void
  updateSetScalesByDate: (scale: IScale[]) => void
  updateScalesByDate: (scale: IScale[]) => void
  fetchLoadMonthScale: (date: string) => void
  fetchInputFlow: (date: string) => void
  updateGetCurrenDate: (date: string) => void
  updateFinishedScaleByMonth: () => void
  postScaleApprovalRequest: () => void
  fetchGetScaleApprovalByDate: () => void
  updateScaleApprovalRequest: (
    id: string,
    status: number,
    storeCode: string,
  ) => void
  scalesByDate: IScale[]
  scaleSummary: Array<IScaleSummary[]>
  scaleSummaryByFortnight: Array<IScaleSummary[]>
  inputFlow: DataType[]
  dataFinishScale: IDataFinishScale[]
  dataScaleApprovalRequest: IScaleApprovalRequest[]
  isLoadingScale: boolean
  paramGenerateScaleNextMonth: IParamGenerateScaleNextMonth
  paramToAlterDayScale: IParamToAlterDayScale
  storesScaleStatus: IStoresScaleStatus[]
}
