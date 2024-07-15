import { AverageSalesDayChart } from './components/AverageSalesDayChart'
import { AverageSalesHourChart } from './components/AverageSalesHourChart'
import { AverageSalesMonthChart } from './components/AverageSalesMonthChart'
import { GoalEmployeesChart } from './components/GoalEmployeesChart'
import SliderSizes from './components/Slider'
import {
  Container,
  ContainerChartAverageSalesDay,
  ContainerChartAverageSalesHour,
  ContainerChartAverageSalesMonth,
  ContainerChartGoalEmployees,
  ContainerChartsAverageSales,
  ContainerGoals,
  ContentInfoTextAndMonthlyGoal,
  InfoText,
  MonthlyGoalChart,
} from './styles'

export function Dashboard() {
  return (
    <Container>
      <ContainerGoals>
        <ContentInfoTextAndMonthlyGoal>
          <InfoText>
            <h1>Oi, José!</h1>
            <p>Veja as principais informações</p>
            <p>da sua loja aqui!</p>
          </InfoText>

          <MonthlyGoalChart>
            <header>Meta mensal - loja</header>
            <SliderSizes />
            <footer>R$570.000,00</footer>
          </MonthlyGoalChart>
        </ContentInfoTextAndMonthlyGoal>

        <ContainerChartGoalEmployees>
          <header>Meta de Colaboladores</header>
          <section>
            <GoalEmployeesChart />
          </section>
        </ContainerChartGoalEmployees>
      </ContainerGoals>

      <ContainerChartsAverageSales>
        <ContainerChartAverageSalesHour>
          <header>Média de Vendas por Hora</header>

          <section>
            <AverageSalesHourChart />
          </section>
        </ContainerChartAverageSalesHour>
        <ContainerChartAverageSalesDay>
          <header>Média de Vendas por Dia</header>

          <section>
            <AverageSalesDayChart />
          </section>
        </ContainerChartAverageSalesDay>
      </ContainerChartsAverageSales>

      <ContainerChartAverageSalesMonth>
        <header>Ranking de Vendas Mês</header>

        <section>
          <AverageSalesMonthChart />
        </section>
      </ContainerChartAverageSalesMonth>
    </Container>
  )
}
