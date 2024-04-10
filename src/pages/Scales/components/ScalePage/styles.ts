import styled from '@emotion/styled'

export const Container = styled.section`
  margin-top: 20px;
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

        &:nth-of-type(5) {
          th:nth-of-type(1) {
            color: ${(props) => props.theme.orangeDark};
            text-align: left;
            padding-left: 30px;
          }

          th:nth-of-type(2) {
            color: ${(props) => props.theme.orangeDark};
            text-align: left;
          }
        }

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
        &:nth-last-of-type(2) {
          font-weight: bold;
        }
        &:nth-last-of-type(3) {
          font-weight: bold;
        }
        &:nth-last-of-type(4) {
          color: ${(props) => props.theme.greenMedium};
          font-weight: bold;
        }
        td {
          border: 1px solid #d5d5d5;
          width: 100%;
          height: 32px;
          text-align: center;

          &:first-of-type {
            padding: 0 30px;
            text-align: left;
            border: 0;
            min-width: 200px;
            font-weight: 600;
            &.title-info-scale {
              font-size: 12px;
              color: ${(props) => props.theme.greenMedium};
            }
          }

          &:nth-of-type(2) {
            text-align: left;
            border: 0;
            min-width: 60px;
            font-weight: 600;
          }
        }
      }
    }
  }
`

interface SelectStyledProps {
  option: string | null
  turn: string
  status: boolean
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
      props.option === 'T' && props.turn === 'T1'
        ? props.theme.yellow
        : props.option === 'T' && props.turn === 'T2'
          ? props.theme.orangeMedium
          : props.option === 'T' && props.turn === 'T3'
            ? props.theme.beigeDark
            : props.option === 'R'
              ? props.theme.blueLight
              : 'transparent'};
  }

  opacity: ${(props) => props.status === false && 0};

  transition: opacity ease-in 0.4s;
`

interface TableDataInfo {
  type: string
  value: number | string
}

export const TableDataInfo = styled.td<TableDataInfo>`
  color: ${(props) =>
    props.type === 'Atendimento Médio' &&
    Number(props.value) > 9 &&
    Number(props.value) <= 25 &&
    '#fff'};

  background-color: ${(props) =>
    props.type === 'Atendimento Médio' &&
    (Number(props.value) > 0 && Number(props.value) <= 3
      ? '#FFEFEF'
      : Number(props.value) > 3 && Number(props.value) <= 6
        ? '#FFCDCD'
        : Number(props.value) > 6 && Number(props.value) <= 9
          ? '#FF9494'
          : Number(props.value) > 9 && Number(props.value) <= 15
            ? '#FB4949'
            : Number(props.value) > 15 && Number(props.value) <= 20
              ? '#FF1A1A'
              : Number(props.value) > 20 && Number(props.value) <= 25
                ? '#C60000'
                : 'transparent')};
`
