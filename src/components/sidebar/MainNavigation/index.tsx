import {
  CgCornerDownLeft,
  CgHomeAlt,
  CgMenuGridO,
  CgOptions,
  CgPoll,
  CgProfile,
} from 'react-icons/cg'
import { useLocation } from 'react-router-dom'

import { NavMenu, StyledLink } from './styles'

interface MainNavigationProps {
  isSidebarOpen: boolean
}

export function MainNavigation(props: MainNavigationProps) {
  const { pathname } = useLocation()
  const { isSidebarOpen } = props

  return (
    <NavMenu>
      <section>
        <StyledLink to="/" data-current={pathname === '/'}>
          <div className="background-icon">
            <CgHomeAlt />
          </div>
          {!isSidebarOpen && <span>Dashboard</span>}
        </StyledLink>
        <StyledLink to="/escalas" data-current={pathname === '/escalas'}>
          <div className="background-icon">
            <CgMenuGridO />
          </div>
          {!isSidebarOpen && <span>Escalas</span>}
        </StyledLink>
        <StyledLink to="/metas" data-current={pathname === '/metas'}>
          <div className="background-icon">
            <CgPoll />
          </div>
          {!isSidebarOpen && <span>Metas</span>}
        </StyledLink>
        <StyledLink
          to="/colaboradores"
          data-current={pathname === '/colaboradores'}
        >
          <div className="background-icon">
            <CgProfile />
          </div>
          {!isSidebarOpen && <span>Colaboradores</span>}
        </StyledLink>
        <StyledLink to="/simulador" data-current={pathname === '/simulador'}>
          <div className="background-icon">
            <CgOptions />
          </div>
          {!isSidebarOpen && <span>Simulador</span>}
        </StyledLink>
      </section>

      <footer>
        <StyledLink to="#">
          <div className="background-icon">
            <CgCornerDownLeft />
          </div>
          {!isSidebarOpen && <span>Entrada Bipada</span>}
        </StyledLink>
      </footer>
    </NavMenu>
  )
}
