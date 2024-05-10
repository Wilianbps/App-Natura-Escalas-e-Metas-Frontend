import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { UseFormRegister } from 'react-hook-form'

interface WorkShiftProps {
  register: UseFormRegister<{ selectedShift: string | null }>
  shift: string | null | undefined
}

export function WorkShift(props: WorkShiftProps) {
  const { register, shift } = props

  return (
    <FormControl>
      <FormLabel
        id="demo-radio-buttons-group-label"
        sx={{
          color: '#000!important',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        Turnos
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="selectedShift"
        sx={{ '.MuiFormControlLabel-label': { fontSize: '14px' } }}
        defaultValue={shift}
      >
        <FormControlLabel
          value="Matutino"
          control={<Radio size="small" />}
          label="Matutino (07:00 - 14:30)"
          {...register('selectedShift')}
        />
        <FormControlLabel
          value="Vespertino"
          control={<Radio size="small" />}
          label="Vespertino (11:00 - 18:30)"
          {...register('selectedShift')}
        />
        <FormControlLabel
          value="Noturno"
          control={<Radio size="small" />}
          label="Noturno (14:30 - 22:00)"
          sx={{ fontSize: '13px' }}
          {...register('selectedShift')}
        />
      </RadioGroup>
    </FormControl>
  )
}
