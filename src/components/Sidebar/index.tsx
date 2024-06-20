import { CgMenuLeft } from 'react-icons/cg'

import { SidebarProps } from './interfaces/index'
import { MainNavigation } from './MainNavigation'
import { ContainerSidebar, ContentSidebarNavigation, Header } from './styles'

export function Sidebar(props: SidebarProps) {
  const { isSidebarOpen, onHandleClickSidebarToogle } = props
  return (
    <ContainerSidebar>
      <Header>
        {!isSidebarOpen && <h3>Escalas e Metas</h3>}
        <CgMenuLeft onClick={onHandleClickSidebarToogle} />
      </Header>
      <ContentSidebarNavigation>
        <MainNavigation isSidebarOpen={isSidebarOpen} />
      </ContentSidebarNavigation>
    </ContainerSidebar>
  )
}
