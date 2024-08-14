import styled from '@emotion/styled'

interface ITextProps {
  marginTop?: string
  color?: string
}

export const Text = styled.p<ITextProps>`
  margin-top: ${(props) => props.marginTop};
  font-weight: bold;
  color: ${(props) => props.color};
`
