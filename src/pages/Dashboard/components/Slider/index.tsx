import Box from '@mui/material/Box'

import { CustomSlider } from './styles'

export default function SliderSizes() {
  return (
    <Box sx={{ width: '100%' }}>
      <CustomSlider
        max={1000000}
        defaultValue={570000}
        aria-label="Default"
        valueLabelDisplay="auto"
        sx={{ height: 22 }}
      />
    </Box>
  )
}
