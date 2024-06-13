import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import { CgEye, CgPen } from 'react-icons/cg'

import { Scale } from './components/ScalePage'
import { Summary } from './components/Summary'
import { Container } from './styles'

export function ScalePage() {
  const [value, setValue] = useState('2')

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <Container>
      <header>
        <h1>Escalas</h1>
      </header>

      <Box sx={{ width: '100%', marginTop: '10px' }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              padding: 0,
            }}
          >
            <TabList onChange={handleChange}>
              <Tab
                label="Configurar"
                icon={<CgPen />}
                iconPosition="end"
                value="1"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                }}
              />
              <Tab
                label="Resumo"
                icon={<CgEye />}
                iconPosition="end"
                value="2"
                sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <Scale />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <Summary />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  )
}
