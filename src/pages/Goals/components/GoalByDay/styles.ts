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
        th {
          text-align: left;
          height: 3rem;
          /*         min-width: 50px; */
          padding: 0 0.5rem;
          text-align: center;
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
        td:nth-of-type(n + 3) {
          background-color: #fff3e0;
        }
        td {
          height: 3rem;
          padding: 0 0.2rem;
          text-align: center;
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
