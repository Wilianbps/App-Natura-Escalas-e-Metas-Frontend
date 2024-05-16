import { toast } from 'sonner'

import { IEmployee } from './interfaces'

export function modalValidations(employee: IEmployee) {
  /*   const startVacation: Date | string =
    typeof employee.startVacation === 'string'
      ? new Date(employee.startVacation)
      : ''

  const finishVacation: Date | string =
    typeof employee.finishVacation === 'string'
      ? new Date(employee.finishVacation)
      : '' */

  if (employee.shift === null) {
    return toast.error('Selecione um turno.', {
      style: { height: '50px', padding: '15px' },
    })
  }
}
