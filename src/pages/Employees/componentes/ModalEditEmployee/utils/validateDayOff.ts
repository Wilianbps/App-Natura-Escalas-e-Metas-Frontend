import { format, isEqual, isWithinInterval, parseISO } from 'date-fns'
import { toast } from 'sonner'

interface IVacation {
  id?: number
  startVacation: string | null
  finishVacation: string | null
  type?: string
}

interface IDayOff {
  id?: number | string
  date: string | null
  type?: string
}

export function validateDayOff(
  dayOffToCheck: Date,
  arrayVacation: IVacation[],
  arrayDayOff: IDayOff[],
) {
  const dayOffToCheckFormated = new Date(dayOffToCheck)

  dayOffToCheckFormated.setUTCHours(0, 0, 0, 0)

  const DateToISOString = dayOffToCheckFormated.toISOString()

  if (!dayOffToCheck) {
    return toast.error('Informe uma data', {
      style: { height: '50px', padding: '15px' },
    })
  }

  const rangeVacation = arrayVacation.some((date) => {
    if (!date?.startVacation || !date.finishVacation) {
      return false // Se qualquer uma das datas de início ou fim for null, não é um intervalo válido
    }

    const newDate = new Date(dayOffToCheck)
    const dateFormated = newDate.toISOString().substring(0, 10)

    return isWithinInterval(dateFormated, {
      start: parseISO(date.startVacation),
      end: parseISO(date.finishVacation),
    })
  })

  if (rangeVacation) {
    toast.error(
      `Dia ${format(dayOffToCheck, 'dd/MM/yyyy')} está dentro de um período de férias.`,
      {
        style: { height: '50px', padding: '15px', width: '380px' },
      },
    )
    return true
  }

  const isSameDayOff = arrayDayOff.some((item) => {
    const dayOffoFArrayFormated = new Date(item.date as string)

    dayOffoFArrayFormated.setUTCHours(0, 0, 0, 0)

    const DateToISOStringOfArray = dayOffoFArrayFormated.toISOString()

    return (
      item.date !== null &&
      isEqual(parseISO(DateToISOString), parseISO(DateToISOStringOfArray))
    )
  })

  if (isSameDayOff) {
    toast.error(
      `Dia ${format(dayOffToCheck, 'dd/MM/yyyy')} já foi selecionado como folga.`,
      {
        style: { height: '50px', padding: '15px', width: '380px' },
      },
    )
    return true
  }

  /*  const currentDate = new Date()

  const startOfCurrentMonth = startOfMonth(currentDate)

  startOfCurrentMonth.setUTCHours(0, 0, 0, 0)

  const isDateValid = !isBefore(
    startOfCurrentMonth.toISOString(),
    DateToISOString,
  )

  if (isDateValid) {
    toast.error(`Favor informar data a partir do mês vigente.`, {
      style: { height: '50px', padding: '15px', width: '380px' },
    })
    return true
  } */
}
