import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

import { StyledDatePicker } from './styles'

interface DatePickerEmployeeModalProps {
  label: string
  selectDate: Date | null
  onSelectDate: (date: Date | null) => void
}

export function DatePickerEmployeeModal({
  label,
  selectDate,
  onSelectDate,
}: DatePickerEmployeeModalProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledDatePicker
        label={label}
        format="dd/MM/yyyy"
        value={selectDate}
        onChange={(date: Date | null) => onSelectDate(date)}
      />
    </LocalizationProvider>
  )
}
