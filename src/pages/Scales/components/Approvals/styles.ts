import styled from '@emotion/styled'

export const Container = styled.section`
  margin-top: 20px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    tr {
      th {
        text-align: left;
        padding-bottom: 20px;
        color: ${(props) => props.theme.grayMedium};
        font-size: 0.875rem;
      }
    }
  }

  tbody {
    tr {
      td {
        font-size: 0.813rem;
        padding: 20px 0 20px 0;
        border-top: 1px solid ${(props) => props.theme.grayMedium};

        &:nth-last-of-type(1) {
          text-align: center;
        }

        &:nth-last-of-type(2) {
          text-align: center;
        }
      }
    }
  }
`

interface ITDStatus {
  status: number
}

export const TDStatus = styled.td<ITDStatus>`
  section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    span {
      margin-top: 3px;
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${(props) =>
        props.status === 0
          ? props.theme.grayMedium
          : props.status === 1
            ? props.theme.greenMedium
            : props.status === 2 && props.theme.red};
    }
  }
`

export const ButtonApproval = styled.button`
  width: 90px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  margin: 0 auto;
  font-size: 0.813rem;
  background-color: transparent;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.greenMedium};
  color: ${(props) => props.theme.greenMedium};
  cursor: pointer;
  transition: background 0.2s ease-in;

  &:hover {
    opacity: 0.8;
  }
`

export const ButtonCanceled = styled.button`
  width: 90px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  margin: 0 auto;
  font-size: 0.813rem;
  background-color: transparent;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.red};
  color: ${(props) => props.theme.red};
  cursor: pointer;
  transition: background 0.2s ease-in;

  &:hover {
    background-color: #ffcdcd;
  }
`
