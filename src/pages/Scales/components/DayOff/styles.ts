import styled from '@emotion/styled'

export const Container = styled.section`
  margin-top: 1.875rem;
  > span {
    font-weight: bold;
  }
`

export const ContainerTable = styled.main`
  > table {
    width: 100%;
    font-size: 11px;
    border-collapse: collapse;
    font-weight: 500;

    thead {
      tr {
        &:first-of-type {
          th {
            text-align: left;
            height: 3rem;
            padding: 0 0.5rem;
            text-align: center;
            border: none;
          }
        }

        &:nth-of-type(2) {
          text-align: left;
          height: 3rem;
          padding: 0 0.5rem;
          text-align: center;
          border: 1px solid #e0e0e0;
        }

        &:first-of-type {
          color: ${(props) => props.theme.orangeDark};
        }

        &:nth-of-type(2) {
          th {
            &:nth-of-type(-n + 1) {
              background-color: #ffe9c4;
            }

            background-color: #fff3e0;
          }
        }
      }
    }

    tbody {
      tr {
        &:nth-of-type(odd) {
          background-color: #faf9f8;
        }

        td {
          width: 220px !important;
          height: 3rem;
          padding: 0 0.2rem;
          text-align: center;
          border: 1px solid #e0e0e0;
        }
      }
    }
  }
`

export const ContainerDayOffPdf = styled.section`
  margin: 1.063rem auto;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  width: 50px;
  padding: 12px;
  margin-right: 2rem;
  background-color: #fdbd54;
  border-radius: 50%;
`

interface SelectStyledProps {
  status: string | number | undefined
  isVacation: boolean
}

export const SelectStyled = styled.div<SelectStyledProps>`
  position: relative;
  display: flex;
  width: 100%;
  font-size: 0.875rem;

  select {
    height: 100%;
    width: 100%;
    text-align: center;
    border: none;
    position: absolute;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }

  .styled-select {
    width: 100%;
    border: none;
    height: 45px;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    > span {
      color: ${(props) =>
        props.isVacation ? props.theme.greenMedium : props.theme.orangeDark};
      font-weight: bold;
    }
  }

  transition: opacity ease-in 0.4s;
`
export const Footer = styled.footer`
  margin-top: 2rem;
  text-align: end;
`
