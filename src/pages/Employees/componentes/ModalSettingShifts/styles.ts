import styled from '@emotion/styled'
import { Dialog } from '@mui/material'

export const ContainerModal = styled(Dialog)`
  .MuiPaper-root {
    padding: 40px;
    border-radius: 20px;
    max-width: 38rem;
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
  font-size: 1rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .shift-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    .shift-content {
      width: 100%;
      display: flex;
      justify-content: end;
      gap: 2rem;
    }
    p {
      font-weight: bold;
    }
  }
`

export const ButtonsContainer = styled.footer`
  display: flex;
  justify-content: end;
  margin-top: 1rem;
`
