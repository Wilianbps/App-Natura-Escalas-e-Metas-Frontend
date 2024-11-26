import styled from '@emotion/styled'

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`

interface CardProps {
  colorCard: 'goal' | 'super-goal' | 'hiper-goal'
  isActive?: boolean
}

export const Card = styled.button<CardProps>`
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

  border: none; // Remover borda padrão de botão
  outline: none; // Remover outline para foco
  border: 1px solid
    ${(props) => (props.isActive ? props.theme.orangeDark : 'none')};

  opacity: ${(props) => (props.isActive ? '1' : '0.5')};
  transition: opacity 0.3s ease;

  &:hover {
    cursor: pointer;
    opacity: 1; // Opacidade total no hover
  }

  font-size: 16px;

  header {
    p {
      font-weight: bold;
    }
  }

  &:focus {
    outline: none; // Remover contorno padrão ao focar
  }
`
