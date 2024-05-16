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
  gap: 2rem;

  section.buttons-clear-save {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;

    > button {
      &:nth-of-type(1) {
        border: 1px solid ${(props) => props.theme.orangeMedium};
        transition: background 0.2s ease;

        :hover {
          background-color: ${(props) => props.theme.orangeMedium};
          color: #fff;
        }
      }
    }
  }
`

export const InfoEmployeeContainer = styled.section`
  display: flex;
  justify-content: center;
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
    gap: 1rem;

    > button {
      height: 100%;
      line-height: 0;
      cursor: pointer;
      border-radius: 8px;
      background-color: ${(props) => props.theme.greenMedium};
      padding: 0 8px;
      border: none;
      transition: background 0.3s ease;

      :hover {
        opacity: 0.7;
      }
    }
  }
`

export const SelectVacationContainer = styled.section`
  .container-vacation-button {
    display: flex;
    justify-content: flex-start;
    min-width: 30rem;
    display: flex;
    gap: 1rem;

    > button {
      height: 100%;
      line-height: 0;
      cursor: pointer;
      border-radius: 8px;
      background-color: ${(props) => props.theme.greenMedium};
      padding: 11px 8px;
      border: none;
      transition: opacity 0.3s ease;

      :hover {
        opacity: 0.7;
      }
    }
  }
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

  .content-dayOff {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    p {
      font-weight: 500;
      background-color: ${(props) => props.theme.yellowLight};
      padding: 5px;
      border-radius: 8px;
      min-width: 100px;
      text-align: center;
    }

    .delete-dayOff {
      background-color: #f9d2da;
      line-height: 0;
      padding: 5px;
      border-radius: 8px;
      cursor: pointer;
      transition: opacity 0.3s ease;

      > svg {
        color: ${(props) => props.theme.red};
        font-size: 18px;
      }

      :hover {
        opacity: 0.8;
      }
    }
  }
`
export const ContainerVacation = styled.section`
  table {
    margin: 0 auto;
    width: 50%;
    margin-top: 20px;
    text-align: center;

    > thead {
      th {
        padding-bottom: 10px;
      }
    }
    > tbody {
      td {
        font-weight: 500;
        background-color: ${(props) => props.theme.yellowLight};
        padding: 5px;
        border-radius: 8px;
        min-width: 100px;
        text-align: center;

        &:nth-of-type(3) {
          background-color: #fff;
        }

        > section {
          &.delete-vacation {
            display: block;
            margin: 0 auto;
            width: 30px;
            background-color: #f9d2da;
            line-height: 0;
            padding: 5px;
            border-radius: 8px;
            cursor: pointer;
            transition: opacity 0.3s ease;

            > svg {
              color: ${(props) => props.theme.red};
              font-size: 18px;
            }

            :hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  }
`
