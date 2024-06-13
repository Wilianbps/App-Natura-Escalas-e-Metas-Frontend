import styled from '@emotion/styled'

export const Container = styled.section`
  margin-top: 20px;
`

export const ContainerTable = styled.main`
  table {
    width: 100%;
    border-collapse: collapse;
    thead {
      tr {
        th {
          height: 4.5rem;
          font-size: 0.813rem;
          font-weight: 500;
          color: #0f0f0f;
          background-color: #f2f2f2;

          > p {
            padding: 3px 0;
          }
        }
      }
    }
  }
`

const TRShift = styled.tr`
  font-size: 13px;

  td {
    position: relative;
    padding: 10px;
    text-align: center;
    border: 1px solid #d5d5d5;
    background-color: #f8f8f8;
    &.td-turn {
      border: none;
      font-size: 14px;
      font-weight: 600;
    }

    &.td-name {
      border-left: none;
      font-weight: 500;
    }

    .border-left::before {
      content: '';
      position: absolute;
      left: 0;
      height: 50px;
      width: 8px;
      border-radius: 10px;
    }

    .border-right::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 8px;
      border-radius: 10px;
    }

    > p {
      padding: 3px 0;
    }
  }
`

interface TDShiftProps {
  value: string
  shift: string
}

export const TDShift = styled.td<TDShiftProps>`
  > div {
    background-color: ${(props) =>
      props.shift === 'T1'
        ? props.value === 'T'
          ? props.theme.greenLight
          : props.theme.gray
        : (props) =>
            props.shift === 'T2'
              ? props.value === 'T'
                ? props.theme.orangeDark
                : props.theme.gray
              : (props) =>
                  props.shift === 'T3'
                    ? props.value === 'T'
                      ? props.theme.brown
                      : props.theme.gray
                    : (props) =>
                        props.shift === '' && props.value === 'F'
                          ? props.theme.gray
                          : ''};

    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    font-weight: 500;

    border-radius: 50%;
  }
`

export const TRShiftMorning = styled(TRShift)`
  td {
    &.td-turn {
      color: ${(props) => props.theme.greenLight};
    }

    .border-left::before {
      background: ${(props) => props.theme.greenLight};
    }

    .border-right::after {
      background: ${(props) => props.theme.greenLight};
    }
  }
`

export const TRShiftAfternoon = styled(TRShift)`
  td {
    &.td-turn {
      color: ${(props) => props.theme.orangeDark};
    }

    .border-left::before {
      background: ${(props) => props.theme.orangeDark};
    }

    .border-right::after {
      background: ${(props) => props.theme.orangeDark};
    }
  }
`

export const TRShiftNight = styled(TRShift)`
  td {
    &.td-turn {
      color: ${(props) => props.theme.brown};
    }

    .border-left::before {
      background: ${(props) => props.theme.brown};
    }

    .border-right::after {
      background: ${(props) => props.theme.brown};
    }
  }
`
