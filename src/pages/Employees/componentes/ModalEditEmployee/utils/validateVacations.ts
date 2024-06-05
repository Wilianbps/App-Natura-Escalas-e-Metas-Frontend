import { isBefore } from 'date-fns'
import { toast } from 'sonner'

export function validateVacations(
  selectedStartVacation: Date | null,
  selectedFinishVacation: Date | null,
) {
  if (selectedStartVacation && selectedFinishVacation) {
    if (isBefore(selectedFinishVacation, selectedStartVacation)) {
      return toast.error(
        'A data de fim não pode ser anterior à data de início.',
        {
          style: { width: '370px', height: '50px', padding: '15px' },
        },
      )
    }
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
