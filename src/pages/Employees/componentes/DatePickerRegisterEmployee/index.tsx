/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ptBR } from 'date-fns/locale'
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
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Controller
        name="date"
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => {
          return (
            <StyledDatePicker
              {...field}
              format="dd/MM/yyyy"
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
