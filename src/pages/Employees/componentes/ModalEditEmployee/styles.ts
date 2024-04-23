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

export const FormModal = styled.form`
  margin-top: 3.125rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  > button {
    align-self: flex-end;
  }
`

export const InfoEmployeeContainer = styled.section`
  display: flex;
  gap: 1rem;
`

export const SelectDayoffContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 30rem;
  display: flex;
  gap: 1rem;

  .container-selectDayOff-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    > button {
      height: 100%;
      padding: 10px;
      cursor: pointer;
      border-radius: 8px;
      border: none;
      color: white;
    }
  }
`

export const SelectVacationContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  min-width: 30rem;
  display: flex;
  gap: 1rem;
`

export const DividerVertical = styled.div`
  border-left: 1px solid black;
  min-height: 300px;
  margin: 0 20px;
`

export const ContainerWorkShift = styled.section`
  min-width: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ContainerDaysOff = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  > p {
    font-weight: 500;
    background-color: ${(props) => props.theme.yellowLight};
    padding: 5px;
    border-radius: 8px;
  }
`
