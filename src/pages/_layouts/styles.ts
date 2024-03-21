import styled from '@emotion/styled'

interface ContainerLayoutProps {
  toogle: boolean
}

export const ContainerLayout = styled.section<ContainerLayoutProps>`
  min-height: 100vh;
  display: grid;
  grid-template-columns: ${(props) => (!props.toogle ? '15rem' : '5rem')} 1fr;

  transition: grid-template-columns 0.3s ease;
`
