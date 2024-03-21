import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar/'

import { ContainerLayout } from './styles'

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function handleClickSidebarToogle() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <ContainerLayout toogle={isSidebarOpen}>
      <Sidebar
        onHandleClickSidebarToogle={handleClickSidebarToogle}
        isSidebarOpen={isSidebarOpen}
      />
      <div>
        <Header />
        <Outlet />
      </div>
    </ContainerLayout>
  )
}
