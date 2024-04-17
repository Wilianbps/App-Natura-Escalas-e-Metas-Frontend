import styled from '@emotion/styled'

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`

interface CardProps {
  colorCard: string
}

export const Card = styled.section<CardProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${(props) =>
    props.colorCard === 'goal'
      ? '#fff7eb'
      : props.colorCard === 'super-goal'
        ? '#FFDBA0'
        : props.colorCard === 'hiper-goal' && '#FFBE53'};
  border-radius: 50px;
  padding: 20px 60px;

  font-size: 16px;
  header {
    p {
      font-weight: bold;
    }
  }
`
