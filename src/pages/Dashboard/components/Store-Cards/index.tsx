import { useEffect, useState } from 'react'

import { useSettings } from '@/contexts/setting/SettingContext'

import { Card, Container } from './styles'

interface StoreCardsProps {
  onSetStatusScale: (cardType: string) => void
}

export function StoreCards(props: StoreCardsProps) {
  const { onSetStatusScale } = props

  const { monthValue } = useSettings()

  const [activeCard, setActiveCard] = useState('finished-stores')

  const handleCardClick = (cardType: string) => {
    onSetStatusScale(cardType)
    setActiveCard(cardType)
  }

  useEffect(() => {
    setActiveCard('finished-stores')
  }, [monthValue])

  return (
    <Container>
      <Card
        type="button"
        colorCard="finished-stores"
        isActive={activeCard === 'finished-stores'}
        onClick={() => handleCardClick('finished-stores')}
      >
        <header>
          <p>Lojas Finalizadas</p>
        </header>
      </Card>
      <Card
        type="button"
        colorCard="unfinished-stores"
        isActive={activeCard === 'unfinished-stores'}
        onClick={() => handleCardClick('unfinished-stores')}
      >
        <header>
          <p>Lojas Não Finalizadas</p>
        </header>
      </Card>
      <Card
        type="button"
        colorCard="non-generated-stores"
        isActive={activeCard === 'non-generated-stores'}
        onClick={() => handleCardClick('non-generated-stores')}
      >
        <header>
          <p>Lojas Não Geradas</p>
        </header>
      </Card>
    </Container>
  )
}
