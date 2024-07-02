import styled from '@emotion/styled'

interface ITextProps {
  marginTop: string
}

export const Text = styled.p<ITextProps>`
  margin-top: ${(props) => props.marginTop};
  font-weight: bold;
`
