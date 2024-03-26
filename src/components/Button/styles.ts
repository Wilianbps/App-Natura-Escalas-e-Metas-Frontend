import styled from '@emotion/styled'

interface ContainerButtonProps {
  variants: { color: string; bgColor: string }
}

export const ContainerButton = styled.button<ContainerButtonProps>`
  padding: 12px 30px 12px 30px;
  color: ${(props) => props.variants.color};
  background-color: ${(props) => props.variants.bgColor};
  font-weight: 500;
  cursor: pointer;
  border: 0;
  border-radius: 30px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`
