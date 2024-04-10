import styled from '@emotion/styled'

export const Container = styled.section`
  padding: 1.25rem 3.125rem;
  margin-top: 6.25rem;

  h1 {
    font-size: 1.875rem;
    font-weight: 300;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 1rem;
    margin-top: 1.5rem;

    thead {
      td {
        padding: 0 2rem;
        text-align: center;
        font-weight: 600;
        color: orange;

        &:last-child {
          text-align: end;
        }
      }
    }

    tbody {
      td {
        padding: 0.5rem 2rem;
        background-color: ${(props) => props.theme.grayLight};
        text-align: center;
        &:first-child {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }

        &:last-child {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
          text-align: end;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 3.4rem;
        }

        .circle {
          cursor: pointer;
          background-color: #f9f9f9;
          display: flex;
          padding: 8px;
          border-radius: 50%;
          margin-right: 10px;

          > svg {
            font-size: 1.3rem;
            color: ${(props) => props.theme.orangeDark};
          }
        }
      }
    }
  }
  footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 4.375rem;
  }
`
