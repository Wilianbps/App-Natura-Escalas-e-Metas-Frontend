import { eachWeekOfInterval } from 'date-fns'

interface DayAndMonth {
  day: number
  month: number
}
type Week = DayAndMonth[]
type WeeksArray = Week[]

export function daysOfWeek(month: number | null, year: number | undefined) {
  const firstDay = month && year && new Date(year, month - 1, 1)
  const lastDay = month && year && new Date(year, month, 0)

  const result = eachWeekOfInterval(
    {
      start: firstDay || '',
      end: lastDay || '',
    },
    { weekStartsOn: 1 },
  )

  const numberOfWeeks = result.length

  const weeksArray: WeeksArray = Array.from({ length: numberOfWeeks }, () => [])

  weeksArray.forEach((week, weekNumber) => {
    const date = new Date(result[weekNumber])

    for (let i = 1; i <= 7; i++) {
      week.push({ day: date.getDate(), month: date.getMonth() + 1 })
      date.setDate(date.getDate() + 1)
    }
  })

  return weeksArray
}
