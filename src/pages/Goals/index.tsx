import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, LinearProgress, Tab } from '@mui/material'
import { useState } from 'react'

import { TextInfo } from '@/components/TextInfo'
import { useGoals } from '@/contexts/goals/GoalsContext'

import { GoalCards } from './components/Goal-Cards'
import { GoalByDay } from './components/GoalByDay'
import { GoalByWeek } from './components/GoalByWeek'
import { Container } from './styles'

export function Goals() {
  const { isLoadingGoalsByFortnight } = useGoals()
  const [value, setValue] = useState('1')

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Container>
      <header>
        {isLoadingGoalsByFortnight ? (
          <>
            <TextInfo text="Carregando Metas..." />
            <Box
              sx={{ width: '100%', marginBottom: '50px', marginTop: '10px' }}
            >
              <LinearProgress />
            </Box>
          </>
        ) : (
          <>
            <h1>Metas</h1>
          </>
        )}
      </header>

      <GoalCards />

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
                label="Dias"
                value="1"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                }}
              />
              <Tab
                label="Semanas"
                value="2"
                sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <GoalByDay />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <GoalByWeek />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  )
}
