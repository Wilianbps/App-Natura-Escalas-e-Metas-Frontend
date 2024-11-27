import { formatInTimeZone } from 'date-fns-tz'

interface IEmployee {
  idSeler?: number
  idDayOff?: number
  storeCode?: string
  userLogin?: string
  name?: string
  cpf?: string | null
  newUser?: boolean | null
  status?: boolean
  office?: string
  idShift?: number
  shift: string | null
  startTime?: string
  finishTime?: string
  startVacation: string | null
  finishVacation: string | null
  arrayDaysOff?: {
    id?: number
    date: string | null
    type?: string
  }[]
  arrayVacation?: {
    id?: number
    startVacation: string | null
    finishVacation: string | null
    type?: string
  }[]
  flowScale?: string
}

export function getEmployeesWithSameDayOff(
  employees: IEmployee[],
  dayOff: Date | null,
) {
  const formattedDayOff = formatInTimeZone(dayOff!, 'UTC', 'yyyy-MM-dd')

  // Filtrar funcionários com folga no mesmo dia
  const employeesWithDayOff = employees.filter((employee) =>
    employee.arrayDaysOff?.some((day) => {
      if (!day.date) return false

      const formattedDay = formatInTimeZone(
        new Date(day.date),
        'UTC',
        'yyyy-MM-dd',
      )
      return formattedDay === formattedDayOff
    }),
  )

  return employeesWithDayOff
}
