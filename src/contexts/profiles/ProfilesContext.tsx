import Cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react'

import { ProfilesContextType } from './interfaces'

const ProfilesContext = createContext({} as ProfilesContextType)

function ProfilesProvider({ children }: { children: React.ReactNode }) {
  const [cookieStoreCode, setCokkieStoreCode] = useState('')
  const [cookieUserLogin, setCokkieUserLogin] = useState('')

  useEffect(() => {
    const cookieCode = Cookies.get('codigo_loja')
    setCokkieStoreCode(cookieCode || '')

    const cokkieUser = Cookies.get('usuario')
    setCokkieUserLogin(cokkieUser || '')
  }, [])
  return (
    <ProfilesContext.Provider value={{ cookieStoreCode, cookieUserLogin }}>
      {children}
    </ProfilesContext.Provider>
  )
}

function useProfiles() {
  const context = useContext(ProfilesContext)
  return context
}
export { ProfilesContext, ProfilesProvider, useProfiles }
