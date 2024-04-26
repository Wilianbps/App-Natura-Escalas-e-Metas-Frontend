import { format } from 'date-fns'

type DateOrArray = Date[] | null

export function formatArrayDate(
  arrayDate: DateOrArray,
  formatString = 'yyyy-MM-dd',
) {
  if (arrayDate === null) {
    return [] as Date[]
  }

  if (Array.isArray(arrayDate)) {
    return arrayDate.map((date) => format(date, formatString))
  }

  return [] as Date[]
}
