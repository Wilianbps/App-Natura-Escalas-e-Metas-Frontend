import { Card, Container } from './styles'

export function GoalCards() {
  return (
    <Container>
      <Card colorCard="goal">
        <header>
          <p>Meta Loja</p>
        </header>
        <p>R$100.000,00</p>
      </Card>
      <Card colorCard="super-goal">
        <header>
          <p>Super Meta</p>
        </header>
        <p>R$120.000,00</p>
      </Card>
      <Card colorCard="hiper-goal">
        <header>
          <p>Hiper Meta</p>
        </header>
        <p>R$150.000,00</p>
      </Card>
    </Container>
  )
}
