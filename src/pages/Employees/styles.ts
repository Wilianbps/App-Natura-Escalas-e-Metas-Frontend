import styled from '@emotion/styled'

export const Container = styled.section`
  padding: 1.25rem 3.125rem;
  margin-top: 6.25rem;

  form {
    header {
      h1 {
        font-size: 1.875rem;
        font-weight: 300;
        margin-bottom: 2rem;
      }

      div {
        display: flex;
        gap: 2rem;
        button {
          padding: 9px 26px 9px 26px;
          width: 240px;
          color: #000;
          background-color: #ffe2b3;
          font-weight: 500;
          cursor: pointer;
          border: 0;
          border-radius: 30px;
          transition: opacity 0.2s ease;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 1rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;

    thead {
      td {
        padding: 0 2rem;
        text-align: center;
        font-weight: 600;
        color: orange;
      }
    }

    tbody tr td {
      padding: 0.5rem 2rem;
      background-color: ${(props) => props.theme.grayLight};
      text-align: center;
    }

    tbody tr td.has-circle {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .circle {
      margin: 0 auto;
      cursor: pointer;
      background-color: #f9f9f9;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 44px;
      height: 44px;

      > svg {
        font-size: 1.3rem;
        color: ${(props) => props.theme.orangeDark};
      }
    }
  }
  footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 4.375rem;
  }
`

export const ScaleFlowContainer = styled.section`
  margin-top: 1rem;
  > header {
    h2 {
      font-weight: 400;
    }
  }
  section {
    margin-top: 1.5rem;
    &.buttons-flow {
      display: flex;
      align-items: center;
      gap: 4rem;

      > section {
        input[type='radio'] {
          display: none;
        }
        > label {
          width: 120px; /* Você pode ajustar este valor conforme necessário */
          text-align: center;
          display: block;
        }

        > input[type='radio'] + label {
          border-radius: 50px;
          background-color: transparent;
          font-weight: 500;
          border: 1px solid ${(props) => props.theme.orangeDark};
          padding: 10px 15px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        input[type='radio']:checked + label {
          background-color: ${(props) => props.theme.orangeMedium};
          color: #fff;
          border: none;
        }

        input[type='radio']:hover + label {
          background-color: ${(props) => props.theme.orangeMedium};
          color: #fff;
          border: none;
        }
      }
    }
  }
`
