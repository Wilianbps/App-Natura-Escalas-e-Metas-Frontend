import styled from '@emotion/styled'

export const ContainerHeader = styled.header`
  height: 6.25rem;
  /*   border-bottom: solid 1px #cfd1d4; */
  position: fixed;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.5rem;
  padding-right: 3.125rem;
  z-index: 1;
  background-color: ${(props) => props.theme.white};
  width: 85%;
`
