export function splitDaysOfMonthIntoTwoParts(month: number, year: number) {
  const primaryArray = []
  const secondArray = []
  const arrayNameMonth = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]

  const daysWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const daysOfMonth = new Date(year, month, 0).getDate()

  const nameMonth = arrayNameMonth[month - 1]

  for (let day = 1; day <= daysOfMonth; day++) {
    const date = new Date(year, month - 1, day)
    const dayMonth = String(day).padStart(2, '0')
    const dayAndMonth = String(day).padStart(2, '0') + '/' + nameMonth
    const nameDayOfWeek = daysWeek[date.getDay()]

    if (day <= 15) {
      primaryArray.push({
        dayAndmonth: dayAndMonth,
        dayweek: nameDayOfWeek,
        dayMonth: Number(dayMonth),
      })
    } else {
      secondArray.push({
        dayAndmonth: dayAndMonth,
        dayweek: nameDayOfWeek,
        dayMonth: Number(dayMonth),
      })
    }
  }

  return [primaryArray, secondArray]
}
