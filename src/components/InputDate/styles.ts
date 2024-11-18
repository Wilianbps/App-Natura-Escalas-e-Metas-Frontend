import styled from '@emotion/styled'

export const StyledInputDate = styled.input`
  cursor: pointer;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.yellowMedium};
  color: #6d6d6d;
  font-size: 13px;
  height: 40px;
  width: 100%;
  max-width: 190px;
  font-weight: 600;
  padding: 13px;

  border: 1px solid #cac3b0;

  &::-webkit-calendar-picker-indicator {
    filter: invert(
      0.3
    ); /* Alterar cor do ícone de calendário (funciona em alguns navegadores) */
    transform: scale(1.5);
  }
`
