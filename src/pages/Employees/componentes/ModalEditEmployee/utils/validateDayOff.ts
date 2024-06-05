import { format, isWithinInterval, parseISO } from 'date-fns'
import { toast } from 'sonner'

interface IVacation {
  id?: number
  startVacation: string | null
  finishVacation: string | null
  type?: string
}

export function validateDayOff(
  dayOffToCheck: Date,
  arrayVacation: IVacation[],
) {
  const rangeVacation = arrayVacation.some((date) => {
    if (!date?.startVacation || !date.finishVacation) {
      return false // Se qualquer uma das datas de início ou fim for null, não é um intervalo válido
    }
    return isWithinInterval(dayOffToCheck, {
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
  }

  return rangeVacation // Retornar o resultado da verificação
  /* if (dateExistsInArray) {
    toast.error('Folga está dentro de um período de férias.', {
      style: { height: '50px', padding: '15px' },
    })
  } */
}
