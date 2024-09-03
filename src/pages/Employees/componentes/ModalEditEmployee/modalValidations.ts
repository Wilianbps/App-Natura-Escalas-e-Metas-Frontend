import { toast } from 'sonner'

import { IEmployee } from './interfaces'

export function modalValidations(employee: IEmployee) {
  if (employee.shift === null) {
    return toast.error('Selecione um turno.', {
      style: { height: '50px', padding: '15px' },
    })
  }
}
