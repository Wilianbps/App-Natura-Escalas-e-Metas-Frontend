import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { StyledDatePicker } from './styles'

interface DatePickerMuiProps {
  selectDate: Date | null
  onSelectDate: (date: Date | null) => void
}

export function DatePickerMUI({
  selectDate,
  onSelectDate,
}: DatePickerMuiProps) {
  const monthName = selectDate && format(selectDate, 'MMMM', { locale: ptBR })

  const year = selectDate?.getFullYear()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledDatePicker
        /*   disableOpenPicker */
        format={`${monthName} ${year}`}
        value={selectDate}
        onChange={(date: Date | null) => onSelectDate(date)}
        sx={{
          '& input': {
            height: '0px',
            fontSize: '13px',
          },
        }}
      />
    </LocalizationProvider>
  )
}
