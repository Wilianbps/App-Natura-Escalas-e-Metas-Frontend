import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useState } from 'react'

import { useSettings } from '@/contexts/setting/SettingContext'

interface WorkShiftProps {
  initialShift?: string | null
  onShiftChange?: (shift: string | null) => void
}

export function WorkShift(props: WorkShiftProps) {
  const { shifts } = useSettings()
  const { initialShift = null, onShiftChange } = props
  const [selectedShift, setSelectedShift] = useState<string | null>(
    initialShift,
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newShift = event.target.value
    setSelectedShift(newShift)
    if (onShiftChange) {
      onShiftChange(newShift)
    }
  }

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
        value={selectedShift}
        onChange={handleChange}
      >
        <FormControlLabel
          value="Matutino"
          control={<Radio size="small" />}
          label={`Matutino (${shifts.morning?.startTime} - ${shifts.morning?.endTime})`}
        />
        <FormControlLabel
          value="Vespertino"
          control={<Radio size="small" />}
          label={`Vespertino (${shifts.afternoon?.startTime} - ${shifts.afternoon?.endTime})`}
        />
        <FormControlLabel
          value="Noturno"
          control={<Radio size="small" />}
          label={`Noturno (${shifts.nocturnal?.startTime} - ${shifts.nocturnal?.endTime})`}
          sx={{ fontSize: '13px' }}
        />
      </RadioGroup>
    </FormControl>
  )
}
