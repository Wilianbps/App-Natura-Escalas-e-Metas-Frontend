import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

export const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;

  section {
    display: flex;
    flex-direction: column;
    gap: 2.625rem;
  }

  footer {
    margin-top: auto;
  }
`
export const StyledLink = styled(NavLink)`
  &[data-current='true'] {
    color: orange;
  }

  &:hover {
    color: ${(props) => props.theme.orangeDark};
  }

  display: flex;
  align-items: center;
  gap: 0.875rem;
  text-decoration: none;
  color: ${(props) => props.theme.black};

  span {
    font-size: 0.938rem;
    font-weight: 500;
  }
  .background-icon {
    background-color: ${(props) => props.theme.yellowLight};
    border-radius: 50%;
    margin-left: -10px;

    display: flex;
    justify-content: center;
    align-items: center;

    > svg {
      font-size: 1.5rem;
      margin: 10px;
    }
  }
`
