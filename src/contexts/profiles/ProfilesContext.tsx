import Cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react'

import { api } from '@/services/axios'

import { IStoresByUser, ProfilesContextType } from './interfaces'

const ProfilesContext = createContext({} as ProfilesContextType)

function ProfilesProvider({ children }: { children: React.ReactNode }) {
  const [cookieStoreCode, setCokkieStoreCode] = useState('')
  const [cookieUserLogin, setCokkieUserLogin] = useState('')
  const [cookieProfile, setCokkieProfile] = useState('')

  const [storesByUser, setStoresByUser] = useState<IStoresByUser[]>([])
  const [store, setStore] = useState<string>('')

  function updateSetStore(storeCode: string) {
    setStore(storeCode)
  }

  async function fetchStoresByUser() {
    const response = await api.get(
      `profiles/get-stores-by-user?user=${cookieUserLogin}`,
    )

    setStoresByUser(response.data)
  }

  useEffect(() => {
    const cookieCode = Cookies.get('codigo_loja')
    setCokkieStoreCode(cookieCode || '')

    const cokkieUser = Cookies.get('usuario')
    setCokkieUserLogin(cokkieUser || '')

    const cookieProfileString = Cookies.get('perfil_usuario')
    if (cookieProfileString) {
      try {
        const parsedProfile = JSON.parse(cookieProfileString)
        setCokkieProfile(parsedProfile.perfil)
      } catch (error) {
        console.error('Error parsing cookieProfile:', error)
        setCokkieProfile('')
      }
    }
  }, [])

  useEffect(() => {
    if (cookieUserLogin) {
      fetchStoresByUser()
    }
  }, [cookieUserLogin])

  return (
    <ProfilesContext.Provider
      value={{
        cookieStoreCode,
        cookieUserLogin,
        storesByUser,
        updateSetStore,
        store,
        cookieProfile,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  )
}

function useProfiles() {
  const context = useContext(ProfilesContext)
  return context
}
export { ProfilesContext, ProfilesProvider, useProfiles }
