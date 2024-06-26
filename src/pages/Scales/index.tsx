import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { useMemo, useState } from 'react'
import { CgEye, CgPen } from 'react-icons/cg'

import { useScales } from '@/contexts/scale/ScalesContext'

import { Scale } from './components/ScalePage'
import { Summary } from './components/Summary'
import { Container } from './styles'

export function ScalePage() {
  const { scaleSummary } = useScales()
  const [value, setValue] = useState('setting')

  const infoScalePeriod = useMemo(() => {
    return scaleSummary.some((item) => item.length > 0)
  }, [scaleSummary])

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
                value="setting"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                }}
              />
              <Tab
                label="Resumo"
                icon={<CgEye />}
                iconPosition="end"
                value="summary"
                sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
              />
            </TabList>
          </Box>
          <TabPanel value="setting" sx={{ padding: 0 }}>
            {!infoScalePeriod && <p>Não há informações no período</p>}

            {infoScalePeriod && <Scale />}
          </TabPanel>
          <TabPanel value="summary" sx={{ padding: 0 }}>
            <Summary />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  )
}
