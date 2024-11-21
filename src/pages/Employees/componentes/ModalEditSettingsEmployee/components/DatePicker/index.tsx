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
  const firstDayOfCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  )

  const lastDayOfThreeMonthsAhead = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 3,
    0,
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledDatePicker
        label={label}
        format="dd/MM/yyyy"
        value={selectDate}
        minDate={firstDayOfCurrentMonth}
        maxDate={lastDayOfThreeMonthsAhead}
        onChange={(date: Date | null) => onSelectDate(date)}
      />
    </LocalizationProvider>
  )
}
