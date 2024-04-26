import { isBefore } from 'date-fns'
import { toast } from 'sonner'

import { IEmployee } from './interfaces'

export function modalValidations(employee: IEmployee) {
  const startVacation: Date | string =
    typeof employee.startVacation === 'string'
      ? new Date(employee.startVacation)
      : ''
  const finishVacation: Date | string =
    typeof employee.finishVacation === 'string'
      ? new Date(employee.finishVacation)
      : ''

  if (employee.shift === null) {
    return toast.error('Selecione um turno.', {
      style: { height: '50px', padding: '15px' },
    })
  }

  if (isBefore(finishVacation, startVacation)) {
    return toast.error(
      'A data de fim não pode ser anterior à data de início.',
      {
        style: { width: '370px', height: '50px', padding: '15px' },
      },
    )
  }

  if (startVacation && !finishVacation) {
    return toast.error('Favor informar o fim das férias.', {
      style: { width: '370px', height: '50px', padding: '15px' },
    })
  }

  if (!startVacation && finishVacation) {
    return toast.error('Favor informar o início das férias.', {
      style: { width: '370px', height: '50px', padding: '15px' },
    })
  }
}
