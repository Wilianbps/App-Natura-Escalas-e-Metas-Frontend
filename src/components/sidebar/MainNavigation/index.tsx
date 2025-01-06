import {
  CgCornerDownLeft,
  CgHomeAlt,
  CgMenuGridO,
  CgPoll,
  CgProfile,
} from 'react-icons/cg'
import { useLocation } from 'react-router-dom'

import { useProfiles } from '@/contexts/profiles/ProfilesContext'

import { NavMenu, StyledLink } from './styles'

interface MainNavigationProps {
  isSidebarOpen: boolean
}

export function MainNavigation(props: MainNavigationProps) {
  const { pathBeepInput } = useProfiles()
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
          to="/configuracoes"
          data-current={pathname === '/configuracoes'}
        >
          <div className="background-icon">
            <CgProfile />
          </div>
          {!isSidebarOpen && <span>Configurações</span>}
        </StyledLink>
      </section>

      <footer>
        <StyledLink to={pathBeepInput.path}>
          <div className="background-icon">
            <CgCornerDownLeft />
          </div>
          {!isSidebarOpen && <span>Entrada Bipada</span>}
        </StyledLink>
      </footer>
    </NavMenu>
  )
}
