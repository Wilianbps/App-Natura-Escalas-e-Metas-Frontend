export interface IStoresByUser {
  user: string
  profile: string
  storeCode: string
  branch: string
  status: boolean
}

export interface ProfilesContextType {
  cookieStoreCode: string
  cookieUserLogin: string
  storesByUser: IStoresByUser[]
  updateSetStore: (storeCode: string) => void
  store: string
  cookieProfile: string
}
