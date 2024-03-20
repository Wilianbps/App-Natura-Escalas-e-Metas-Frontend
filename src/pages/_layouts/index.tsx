import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar/'

import { ContainerLayout } from './styles'

export function AppLayout() {
  return (
    <ContainerLayout>
      <Sidebar />
      <Outlet />
    </ContainerLayout>
  )
}
