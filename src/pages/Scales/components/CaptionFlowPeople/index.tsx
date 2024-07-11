import { CardColor, Container, ContentCardFlowPeople } from './styles'

export function CaptionFlowPeople() {
  return (
    <Container>
      <header>Fluxo Médio de pessoas na loja</header>
      <ContentCardFlowPeople>
        <section>
          <span>1 a 5</span>
          <CardColor color="#FFEFEF" />
        </section>
        <section>
          <span>6 a 10</span>
          <CardColor color="#FFCDCD" />
        </section>
        <section>
          <span>11 a 15</span>
          <CardColor color="#FF9494" />
        </section>
        <section>
          <span>16 a 20</span>
          <CardColor color="#FB4949" />
        </section>
        <section>
          <span>21 a 25</span>
          <CardColor color="#FF1A1A" />
        </section>
        <section>
          <span>+25</span>
          <CardColor color="#C60000" />
        </section>
      </ContentCardFlowPeople>
    </Container>
  )
}
