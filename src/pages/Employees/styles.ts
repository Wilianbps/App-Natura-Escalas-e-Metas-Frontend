import styled from '@emotion/styled'

export const Container = styled.section`
  padding: 1.25rem 3.125rem;

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
        }
      }
    }
  }
`
