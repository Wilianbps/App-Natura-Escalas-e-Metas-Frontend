import { GoalEmployeesChart } from './components/GoalEmployeesChart'
import SliderSizes from './components/Slider'
import {
  Container,
  ContainerGoals,
  ContentInfoTextAndMonthlyGoal,
  GoalEmployeesChartContent,
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

        <GoalEmployeesChartContent>
          <header>Meta de Colaboladores</header>

          <section>
            <GoalEmployeesChart />
          </section>
        </GoalEmployeesChartContent>
      </ContainerGoals>
    </Container>
  )
}
