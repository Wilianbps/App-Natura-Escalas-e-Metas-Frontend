import styled from '@emotion/styled'
import { Dialog } from '@mui/material'

export const ContainerModal = styled(Dialog)`
  .MuiPaper-root {
    padding: 40px;
    border-radius: 20px;
    max-width: 44rem;
    width: 100%;
    font-size: 0.875rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h3 {
    color: ${(props) => props.theme.orangeDark};
  }
`

export const Form = styled.form`
  margin-top: 1rem;
`

export const InputContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .position-cpf-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .position-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cpf-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .error-message {
    min-height: 20px; /* Ajuste conforme necessário */
  }
`

export const ButtonsContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`
