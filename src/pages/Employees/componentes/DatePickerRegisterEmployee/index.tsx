/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { Controller } from 'react-hook-form'

import { StyledDatePicker } from './styles'

type DatePickerEmployeeModalProps = {
  control: any
  label: string
  defaultValue: Date | null
}

export function DatePickerRegisterEmployee({
  control,
  label,
  defaultValue,
}: DatePickerEmployeeModalProps) {
  const today = new Date()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name="date"
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => {
          return (
            <StyledDatePicker
              {...field}
              format="dd/MM/yyyy"
              minDate={today}
              label={label}
              value={field.value || null}
              slotProps={{
                textField: (props) => (
                  <TextField {...props} error={!!fieldState?.error} />
                ),
              }}
            />
          )
        }}
      />
    </LocalizationProvider>
  )
}
