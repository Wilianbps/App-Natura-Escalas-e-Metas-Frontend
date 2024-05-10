import { format } from 'date-fns'

interface IArrayDaysOff {
  id?: number
  date: Date
  type?: string
}

type DateOrArray = IArrayDaysOff[] | null

export function formatArrayDate(
  arrayDate: DateOrArray,
  formatString = 'yyyy-MM-dd',
) {
  if (arrayDate === null) {
    return [] as IArrayDaysOff[]
  }

  if (Array.isArray(arrayDate)) {
    return arrayDate.map((item) => format(item.date, formatString))
  }

  return [] as IArrayDaysOff[]
}
