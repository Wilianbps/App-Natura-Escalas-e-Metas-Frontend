import { useEffect, useState } from 'react'

import { useGoals } from '@/contexts/goals/GoalsContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatNumber } from '@/libs/formatNumber'

import { Card, Container } from './styles'

export function GoalCards() {
  const { monthValue } = useSettings()
  const { goalsByMonth, fetchGoalsByFortnight } = useGoals()
  const [activeCard, setActiveCard] = useState('goal')

  const handleCardClick = (cardType: string) => {
    setActiveCard(cardType)
    fetchGoalsByFortnight(cardType)
  }

  useEffect(() => {
    setActiveCard('goal')
  }, [monthValue])

  return (
    <Container>
      <Card
        type="button"
        colorCard="goal"
        isActive={activeCard === 'goal'}
        onClick={() => handleCardClick('goal')}
      >
        <header>
          <p>Meta Loja</p>
        </header>
        <p>
          {goalsByMonth.length === 0
            ? 'R$000,000,00'
            : formatNumber(goalsByMonth[0]?.goalValue)}
        </p>
      </Card>
      <Card
        type="button"
        colorCard="super-goal"
        isActive={activeCard === 'super-goal'}
        onClick={() => handleCardClick('super-goal')}
      >
        <header>
          <p>Super Meta</p>
        </header>
        <p>
          {goalsByMonth.length === 0
            ? 'R$000,000,00'
            : formatNumber(goalsByMonth[1]?.goalValue)}
        </p>
      </Card>
      <Card
        type="button"
        colorCard="hiper-goal"
        isActive={activeCard === 'hiper-goal'}
        onClick={() => handleCardClick('hiper-goal')}
      >
        <header>
          <p>Hiper Meta</p>
        </header>
        <p>
          {goalsByMonth.length === 0
            ? 'R$000,000,00'
            : formatNumber(goalsByMonth[2]?.goalValue)}
        </p>
      </Card>
    </Container>
  )
}
