import styled from '@emotion/styled'

export const Container = styled.section`
  display: flex;
  align-items: center;
  font-size: 18px;
  gap: 8px;
  margin: 30px 0;
  text-transform: capitalize;
  font-weight: 500;

  span {
    width: 100%;
    max-width: 175px;
    display: flex;
    justify-content: center;
  }

  > button {
    border: 0;
    line-height: 0;
    background-color: transparent;
    cursor: pointer;

    > svg {
      font-size: 20px;
    }
  }
`
