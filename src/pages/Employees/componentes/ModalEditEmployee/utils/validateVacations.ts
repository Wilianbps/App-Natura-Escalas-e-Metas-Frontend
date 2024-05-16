import { isBefore } from 'date-fns'
import { toast } from 'sonner'

export function validateVacations(
  selectedStartVacation: Date | string,
  selectedFinishVacation: Date | string,
) {
  if (isBefore(selectedFinishVacation, selectedStartVacation)) {
    console.log('entrou na validação')
    return toast.error(
      'A data de fim não pode ser anterior à data de início.',
      {
        style: { width: '370px', height: '50px', padding: '15px' },
      },
    )
  }

  if (selectedStartVacation && !selectedFinishVacation) {
    return toast.error('Favor informar o fim das férias.', {
      style: { width: '370px', height: '50px', padding: '15px' },
    })
  }

  if (!selectedStartVacation && selectedFinishVacation) {
    return toast.error('Favor informar o início das férias.', {
      style: { width: '370px', height: '50px', padding: '15px' },
    })
  }
}
