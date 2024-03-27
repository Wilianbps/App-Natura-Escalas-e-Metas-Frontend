import styled from '@emotion/styled'
import { Dialog } from '@mui/material'

export const ContainerModal = styled(Dialog)`
  .MuiPaper-root {
    padding: 20px;
    border-radius: 20px;
    max-width: 70rem;
    width: 100%;
    font-size: 0.875rem;

    .infoEmployee {
      padding: 0px 15px;
      display: flex;
      align-items: center;
      gap: 1rem;

      span {
        font-weight: bold;
      }
    }
  }
`

export const ContentModal = styled.section`
  margin-top: 3.125rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`

export const InfoEmployeeContainer = styled.section`
  display: flex;
  gap: 1rem;
`

export const SelectVacationContainer = styled.section`
  display: flex;
  justify-content: center;
  min-width: 30rem;
  display: flex;
  gap: 1rem;
`

export const DividerVertical = styled.div`
  border-left: 1px solid black;
  height: 300px;
  margin: 0 20px;
`

export const ContainerWorkShift = styled.section`
  min-width: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
