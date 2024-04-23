import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { UseFormRegister } from 'react-hook-form'

interface WorkShiftProps {
  register: UseFormRegister<{ selectedShift: string | null }>
}

export function WorkShift(props: WorkShiftProps) {
  const { register } = props

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
      >
        <FormControlLabel
          value="T1"
          control={<Radio size="small" />}
          label="Matutino (09:30 - 18:00)"
          {...register('selectedShift')}
        />
        <FormControlLabel
          value="T2"
          control={<Radio size="small" />}
          label="Vespertino (12:00 - 20:30)"
          {...register('selectedShift')}
        />
        <FormControlLabel
          value="T3"
          control={<Radio size="small" />}
          label="Noturno (14:00 - 22:00)"
          sx={{ fontSize: '13px' }}
          {...register('selectedShift')}
        />
      </RadioGroup>
    </FormControl>
  )
}
