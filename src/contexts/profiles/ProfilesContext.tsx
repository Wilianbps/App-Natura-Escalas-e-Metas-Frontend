import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

import { api } from '@/services/axios'

import {
  IPathBeepInput,
  IStoresByUser,
  ProfilesContextType,
} from './interfaces'

const ProfilesContext = createContext({} as ProfilesContextType)

function ProfilesProvider({ children }: { children: React.ReactNode }) {
  const [cookieStoreCode, setCokkieStoreCode] = useState('')
  const [cookieUserLogin, setCokkieUserLogin] = useState('')
  const [cookieProfile, setCokkieProfile] = useState('')

  const [storesByUser, setStoresByUser] = useState<IStoresByUser[]>([])
  const [store, setStore] = useState<string>('')
  const [isCookiesLoaded, setIsCookiesLoaded] = useState(false) // Novo estado
  const [pathBeepInput, setPathBeepInput] = useState({} as IPathBeepInput)

  function updateSetStore(storeCode: string) {
    setStore(storeCode)
  }

  async function fetchStoresByUser() {
    if (!cookieUserLogin) {
      return // Não faz a chamada se cookieUserLogin não estiver carregado
    }
    try {
      const response = await api.get(
        `profiles/get-stores-by-user?user=${cookieUserLogin}`,
      )
      setStoresByUser(response.data)
    } catch (error) {
      console.error('Error fetching stores by user:', error)
    }
  }

  function updateCookies() {
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

    setIsCookiesLoaded(true) // Atualiza o estado quando os cookies são carregados
  }

  async function fetchPathBeepInput() {
    const response = await api.get(`profiles/get-path-beep-input`)
    setPathBeepInput(response.data[0])
  }

  useEffect(() => {
    updateCookies()
    fetchPathBeepInput()
  }, [])

  useEffect(() => {
    if (isCookiesLoaded && cookieUserLogin) {
      fetchStoresByUser()
    }
  }, [isCookiesLoaded, cookieUserLogin])

  return (
    <ProfilesContext.Provider
      value={{
        cookieStoreCode,
        cookieUserLogin,
        storesByUser,
        updateSetStore,
        fetchStoresByUser,
        store,
        cookieProfile,
        pathBeepInput,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  )
}

function useProfiles() {
  const cookieStoreCode = useContextSelector(
    ProfilesContext,
    (context) => context.cookieStoreCode,
  )
  const cookieUserLogin = useContextSelector(
    ProfilesContext,
    (context) => context.cookieUserLogin,
  )
  const storesByUser = useContextSelector(
    ProfilesContext,
    (context) => context.storesByUser,
  )
  const updateSetStore = useContextSelector(
    ProfilesContext,
    (context) => context.updateSetStore,
  )
  const store = useContextSelector(ProfilesContext, (context) => context.store)
  const cookieProfile = useContextSelector(
    ProfilesContext,
    (context) => context.cookieProfile,
  )

  const fetchStoresByUser = useContextSelector(
    ProfilesContext,
    (context) => context.fetchStoresByUser,
  )

  const pathBeepInput = useContextSelector(
    ProfilesContext,
    (context) => context.pathBeepInput,
  )

  return {
    cookieStoreCode,
    cookieUserLogin,
    storesByUser,
    updateSetStore,
    fetchStoresByUser,
    store,
    cookieProfile,
    pathBeepInput,
  }
}

export { ProfilesContext, ProfilesProvider, useProfiles }
