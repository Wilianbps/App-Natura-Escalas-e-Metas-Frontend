import styled from '@emotion/styled'

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`

interface CardProps {
  colorCard: 'finished-stores' | 'unfinished-stores' | 'non-generated-stores'
  isActive?: boolean
}

export const Card = styled.button<CardProps>`
  width: 18.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.colorCard === 'finished-stores'
      ? '#fff7eb'
      : props.colorCard === 'unfinished-stores'
        ? '#FFDBA0'
        : props.colorCard === 'non-generated-stores' && '#FFBE53'};

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
