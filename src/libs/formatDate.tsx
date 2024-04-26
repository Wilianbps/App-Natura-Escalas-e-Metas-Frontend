import { format } from 'date-fns'

type DateOrArray = Date | null

export function formatDate(date: DateOrArray, formatString = 'yyyy-MM-dd') {
  if (date === null) {
    return null
  }

  if (date instanceof Date) {
    return format(date, formatString)
  }

  return null
}
