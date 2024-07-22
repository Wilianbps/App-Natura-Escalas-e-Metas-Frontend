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
  const { goalsByMonth } = useGoals()

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
            <header>Meta mensal - loja</header>
            <SliderSizes />
            {goalsByMonth.length === 0 && <footer>R$000.000,00</footer>}
            {goalsByMonth.length !== 0 && (
              <footer>{formatNumber(goalsByMonth[0]?.goalValue)}</footer>
            )}
          </MonthlyGoalChart>
        </ContentInfoTextAndMonthlyGoal>
      </ContainerGoals>
      <ContainerChartGoalEmployees>
        <header>Meta de Colaboladores por Mês</header>
        <section>
          <GoalEmployeesChart />
        </section>
      </ContainerChartGoalEmployees>
      <ContainerChartAverageSalesMonth>
        <header>Ranking de Vendas Mês</header>

        <section>
          <AverageSalesMonthChart />
        </section>
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
