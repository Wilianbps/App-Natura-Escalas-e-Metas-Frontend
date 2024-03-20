import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar/sidebar'

export function AppLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}
