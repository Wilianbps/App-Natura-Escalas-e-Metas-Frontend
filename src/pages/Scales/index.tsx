import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import { CgEye, CgPen } from 'react-icons/cg'

import { Scale } from './components/ScalePage'
import { Container } from './styles'

export function ScalePage() {
  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <Container>
      <header>
        <h1>Escalas</h1>
      </header>

      <Box sx={{ width: '100%', padding: 0 }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              /*               display: 'flex',
              justifyContent: 'flex-end', */
              padding: 0,
            }}
          >
            <TabList onChange={handleChange} aria-labelledby="0">
              <Tab
                label="Configurar"
                icon={<CgPen />}
                iconPosition="end"
                value="1"
              />
              <Tab
                label="Resumo"
                icon={<CgEye />}
                iconPosition="end"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Scale />
          </TabPanel>
          <TabPanel value="2">Resumo</TabPanel>
        </TabContext>
      </Box>
    </Container>
  )
}
