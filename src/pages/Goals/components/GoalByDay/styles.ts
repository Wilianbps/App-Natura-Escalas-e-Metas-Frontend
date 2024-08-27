import styled from '@emotion/styled'

export const Container = styled.section`
  margin-top: 1.875rem;
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
          width: 220px !important;
          height: 3rem;
          padding: 0 0.2rem;
          text-align: center;
          border: 1px solid #e0e0e0;
        }
      }
    }

    tfoot {
      tr {
        font-weight: bold;
        td:nth-of-type(n + 3) {
          background-color: #fff3e0;
        }
        td {
          height: 3rem;
          padding: 0 0.2rem;
          text-align: center;
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

  h3 {
    background-color: #ffe9c4;
    display: inline-block;
    padding: 0.5rem;
  }

  > table {
    width: 100%;
    font-size: 11px;
    border-collapse: collapse;
    font-weight: 500;

    thead {
      tr {
        &:first-of-type {
          height: 3rem;
          padding: 0 0.5rem;
          border: none;
        }

        &:nth-of-type(2) {
          height: 3rem;
          padding: 0 0.5rem;
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
        background-color: #daedff;

        td {
          width: 220px !important;
          height: 3rem;
          padding: 0 0.2rem;
          text-align: center;
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
  }
`
export const ContainerGoalsSummaryPdf = styled.section`
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
