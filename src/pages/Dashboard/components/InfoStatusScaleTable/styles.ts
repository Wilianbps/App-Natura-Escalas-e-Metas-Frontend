import styled from '@emotion/styled'

export const ContainerTable = styled.main`
  > table {
    width: 70%;
    margin: 0 auto;
    font-size: 14px;
    border-collapse: collapse;
    font-weight: 500;

    thead {
      th {
        background-color: #ffe9c4;
        height: 3rem;
        padding: 0 0.5rem;
        text-align: center;
        border: none;
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
