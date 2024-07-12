import styled from '@emotion/styled'

export const Container = styled.section`
  font-size: 0.813rem;
  color: ${(props) => props.theme.grayDark};
  header {
    text-align: left;
    margin-bottom: 1rem;
    font-weight: bold;
  }
`

export const ContentCardFlowPeople = styled.section`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  section {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      font-weight: bold;
    }
  }
`

interface ICardColor {
  color: string
}

export const CardColor = styled.section<ICardColor>`
  width: 25px;
  height: 20px;
  background-color: ${(props) => props.color};
`
