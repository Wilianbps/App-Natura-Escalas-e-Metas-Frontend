import styled from '@emotion/styled'

export const Container = styled.section`
  margin-top: 1.875rem;
`

export const MessageText = styled.p`
  color: ${(props) => props.theme.red};
  font-weight: bold;
  padding-top: 30px;
`

export const ContainerTable = styled.main`
  > table {
    width: 100%;
    font-size: 13px;
    border-collapse: collapse;
    font-weight: 500;

    thead {
      tr {
        th {
          text-align: center;
          height: 3rem;
          padding: 0 2.5rem;
        }

        &:first-of-type {
          text-align: left;
          height: 3rem;
          padding: 0 2.5rem;
          border: none;
        }

        &:nth-of-type(2) {
          text-align: left;
          height: 3rem;
          padding: 0 2.5rem;
          border: 1px solid #e0e0e0;
        }

        &:first-of-type {
          color: ${(props) => props.theme.orangeDark};
        }

        &:nth-of-type(2) {
          th {
            &:nth-of-type(-n + 2) {
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
          text-align: center;
          width: 220px !important;
          height: 3rem;
          padding: 0 2.5rem;
          border: 1px solid #e0e0e0;

          &:first-of-type {
            width: 220px;
          }

          &:nth-of-type(2) {
            font-weight: bold;
          }
          &:nth-of-type(-n + 2) {
          }
        }
      }
    }

    tfoot {
      tr {
        font-weight: bold;
        td:nth-last-of-type(-n + 7) {
          background-color: #fff3e0;
        }
        td {
          text-align: center;
          height: 3rem;
          padding: 0 2.5rem;
          border: 1px solid #e0e0e0;
        }
      }
    }
  }
`

export const Footer = styled.footer`
  margin-top: 2.5rem;
  font-size: 13px;
  font-weight: 500;

  p {
    font-weight: bold;
    margin-bottom: 1.125rem;
  }

  > table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        th {
          text-align: left;
          height: 3rem;
          padding: 0 2.5rem;
        }

        &:first-of-type {
          color: ${(props) => props.theme.orangeDark};
        }

        &:nth-of-type(2) {
          th {
            &:nth-of-type(-n + 2) {
              background-color: #ffe9c4;
            }

            background-color: #fff3e0;
          }
        }
      }
    }

    tbody {
      tr {
        td {
          background-color: #daedff;
          height: 3rem;
          padding: 0 2.5rem;

          &:nth-of-type(-n + 2) {
            font-weight: bold;
          }
        }
      }
    }
  }
`

export const ContainerGoalsByWeekPdf = styled.section`
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
