import { useGoals } from '@/contexts/goals/GoalsContext'
import { formatNumber } from '@/libs/formatNumber'

import { Card, Container } from './styles'

export function GoalCards() {
  const { goalsByMonth } = useGoals()

  return (
    <Container>
      <Card colorCard="goal">
        <header>
          <p>Meta Loja</p>
        </header>
        {goalsByMonth.length === 0 && <p>R$000,000,00</p>}
        {goalsByMonth.length !== 0 && (
          <p>{formatNumber(goalsByMonth[1]?.goalValue)}</p>
        )}
      </Card>
      <Card colorCard="super-goal">
        <header>
          <p>Super Meta</p>
        </header>
        {goalsByMonth.length === 0 && <p>R$000,000,00</p>}
        {goalsByMonth.length !== 0 && (
          <p>{formatNumber(goalsByMonth[2]?.goalValue)}</p>
        )}
      </Card>
      <Card colorCard="hiper-goal">
        <header>
          <p>Hiper Meta</p>
        </header>
        {goalsByMonth.length === 0 && <p>R$000,000,00</p>}
        {goalsByMonth.length !== 0 && (
          <p>{formatNumber(goalsByMonth[0]?.goalValue)}</p>
        )}
      </Card>
    </Container>
  )
}
