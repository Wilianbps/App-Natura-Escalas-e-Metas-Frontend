import { Box, LinearProgress } from '@mui/material'

import { TextInfo } from '@/components/TextInfo'
import { useGoals } from '@/contexts/goals/GoalsContext'
import { useProfiles } from '@/contexts/profiles/ProfilesContext'
import { formatName } from '@/libs/formatName'
import { formatNumber } from '@/libs/formatNumber'

import { AverageSalesMonthChart } from './components/AverageSalesMonthChart'
import { GoalEmployeesChart } from './components/GoalEmployeesChart'
import SliderSizes from './components/Slider'
import {
  Container,
  ContainerChartAverageSalesMonth,
  ContainerChartGoalEmployees,
  ContainerGoals,
  ContentInfoTextAndMonthlyGoal,
  InfoText,
  MonthlyGoalChart,
} from './styles'

export function Dashboard() {
  const { cookieUserLogin } = useProfiles()
  const {
    goalsByMonth,
    isLoadingGoalEmployeeByMonth,
    isLoadingGoalsLastTwelveMonths,
    isLoadingGoalsByMonth,
  } = useGoals()

  return (
    <Container>
      <ContainerGoals>
        <ContentInfoTextAndMonthlyGoal>
          <InfoText>
            <h1>Oi, {formatName(cookieUserLogin)}!</h1>
            <p>Veja as principais informações</p>
            <p>da sua loja aqui!</p>
          </InfoText>

          <MonthlyGoalChart>
            {isLoadingGoalsByMonth && (
              <>
                <TextInfo text="Carregando gráfico Meta mensal - loja..." />
                <Box sx={{ width: '100%', marginTop: '10px' }}>
                  <LinearProgress />
                </Box>
              </>
            )}

            {!isLoadingGoalsByMonth && (
              <>
                <header>Meta mensal - loja</header>
                <SliderSizes />
                {goalsByMonth.length === 0 && <footer>R$000.000,00</footer>}
                {goalsByMonth.length !== 0 && (
                  <footer>{formatNumber(goalsByMonth[0]?.goalValue)}</footer>
                )}
              </>
            )}
          </MonthlyGoalChart>
        </ContentInfoTextAndMonthlyGoal>
      </ContainerGoals>

      <ContainerChartGoalEmployees>
        {isLoadingGoalEmployeeByMonth && (
          <>
            <TextInfo text="Carregando gráfico Meta de Colaboladores por Mês..." />
            <Box sx={{ width: '100%', marginTop: '10px' }}>
              <LinearProgress />
            </Box>
          </>
        )}

        {!isLoadingGoalEmployeeByMonth && (
          <>
            <header>Meta de Colaboladores por Mês</header>
            <section>
              <GoalEmployeesChart />
            </section>
          </>
        )}
      </ContainerChartGoalEmployees>
      <ContainerChartAverageSalesMonth>
        {isLoadingGoalsLastTwelveMonths && (
          <>
            <TextInfo text="Carregando gráfico Ranking de Vendas Mês..." />
            <Box sx={{ width: '100%', marginTop: '10px' }}>
              <LinearProgress />
            </Box>
          </>
        )}

        {!isLoadingGoalsLastTwelveMonths && (
          <>
            <header>Ranking de Vendas Mês</header>

            <section>
              <AverageSalesMonthChart />
            </section>
          </>
        )}
      </ContainerChartAverageSalesMonth>
      {/*  <ContainerChartAverageSalesDay>
        <header>Média de Vendas por Dia</header>
        <section>
          <AverageSalesDayChart />
        </section>
      </ContainerChartAverageSalesDay> */}
    </Container>
  )
}
