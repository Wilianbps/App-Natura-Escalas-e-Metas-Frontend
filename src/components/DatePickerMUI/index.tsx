import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

import { StyledDatePicker } from './styles'

interface DatePickerMuiProps {
  selectDate: Date | null
  onSelectDate: (date: Date | null) => void
}

export function DatePickerMUI({
  selectDate,
  onSelectDate,
}: DatePickerMuiProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledDatePicker
        format="dd/MM/yyyy"
        value={selectDate}
        onChange={(date: Date | null) => onSelectDate(date)}
        sx={{
          '& input': {
            height: '0px', // Ajuste a altura do input conforme necessário
            fontSize: '13px', // Ajuste a fonte do input conforme necessário
          },
        }}
      />
    </LocalizationProvider>
  )
}
