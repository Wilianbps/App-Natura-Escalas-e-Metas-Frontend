import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar/'

import { ContainerLayout } from './styles'

export function AppLayout() {
  return (
    <ContainerLayout>
      <Sidebar />
      <div>
        <Header />
        <Outlet />
      </div>
    </ContainerLayout>
  )
}
