import styled from '@emotion/styled'

export const Container = styled.section`
  padding: 1.25rem 3.125rem;

  header {
    h1 {
      font-size: 1.875rem;
      font-weight: 300;
    }
  }
`

export const ContainerTable = styled.main`
  table {
    width: 100%;
    background-color: #f8f8f8;
    border-radius: 10px;
    color: #414141;
    font-size: 0.813rem;
    border-collapse: collapse;

    thead {
      tr {
        text-align: center;
        th.shifts {
          background-color: #f3f3f3;
          border: 1px solid #d5d5d5;
          padding: 8px;
          text-align: center;
        }
      }
    }

    tbody {
      tr {
        td {
          border: 1px solid #d5d5d5;
          width: 100%;
          height: 32px;
          text-align: center;

          :first-child {
            border: 0;
            min-width: 200px;
            text-align: center;
            font-weight: 500;
          }
        }
      }
    }
  }
`

interface SelectStyledProps {
  variant: string
}

export const SelectStyled = styled.div<SelectStyledProps>`
  position: relative;
  display: flex;
  width: 100%;

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
    height: 32px;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) =>
      props.variant === 'T'
        ? props.theme.yellow
        : props.variant === 'R'
          ? props.theme.blueLight
          : props.variant === 'F'
            ? props.theme.gray
            : props.variant === '' && 'transparent'};
  }

  /* width: 100%;
  height: 32px;
  border: none;
  appearance: none;
  text-align: center;
  cursor: pointer;
  :focus {
    border: 1px solid ${(props) => props.theme.orangeDark};
  }

  background-color: ${(props) =>
    props.variant === 'T'
      ? props.theme.yellow
      : props.variant === 'R'
        ? props.theme.blueLight
        : props.variant === 'F' && props.theme.gray}; */
`
