import styled from '@emotion/styled'
import { Dialog } from '@mui/material'

export const ContainerModal = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 20px;
  }
`

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 30px;
`

export const Buttons = styled.section`
  display: flex;
  justify-content: center;
  gap: 1rem;
`
