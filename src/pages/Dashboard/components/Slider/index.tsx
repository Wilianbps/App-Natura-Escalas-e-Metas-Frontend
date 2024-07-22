import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'

import { useGoals } from '@/contexts/goals/GoalsContext'

import { CustomSlider } from './styles'

export default function SliderSizes() {
  const { goalsByMonth } = useGoals()

  const [sliderValue, setSliderValue] = useState(0)

  useEffect(() => {
    if (goalsByMonth.length !== 0) {
      const numberValue = Math.floor(goalsByMonth[0].goalValue) // Use Math.floor to remove decimal part
      setSliderValue(numberValue)
    } else {
      setSliderValue(0)
    }
  }, [goalsByMonth])

  return (
    <Box sx={{ width: '100%' }}>
      <CustomSlider
        max={1000000}
        value={sliderValue}
        aria-label="Default"
        valueLabelDisplay="auto"
        sx={{ height: 22 }}
      />
    </Box>
  )
}
