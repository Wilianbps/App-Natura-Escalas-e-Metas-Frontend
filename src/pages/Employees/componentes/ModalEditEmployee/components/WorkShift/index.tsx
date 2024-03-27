import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

export function WorkShift() {
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
        name="radio-buttons-group"
        sx={{ '.MuiFormControlLabel-label': { fontSize: '14px' } }}
      >
        <FormControlLabel
          value="Matutino"
          control={<Radio size="small" />}
          label="Matutino (09:30 - 18:00)"
        />
        <FormControlLabel
          value="Vespertino"
          control={<Radio size="small" />}
          label="Vespertino (12:00 - 20:30)"
        />
        <FormControlLabel
          value="Noturno"
          control={<Radio size="small" />}
          label="Noturno (14:00 - 22:00)"
          sx={{ fontSize: '13px' }}
        />
      </RadioGroup>
    </FormControl>
  )
}
