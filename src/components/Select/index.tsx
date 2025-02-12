import { Box, FormControl, MenuItem, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'

import { useProfiles } from '@/contexts/profiles/ProfilesContext'

import { SelectStoresProps } from './interfaces'
import { SelectStyled } from './styles'

export function SelectStores(props: SelectStoresProps) {
  const { minWidth, heightSelect, fontSize } = props
  const { storesByUser, updateSetStore, fetchStoresByUser } = useProfiles()

  const [selectedStore, setSelectedStore] = useState<string>('')

  useEffect(() => {
    if (storesByUser.length > 0) {
      const initialStore = storesByUser[0]
      setSelectedStore(initialStore.storeBranch)
      updateSetStore(initialStore.storeCode)
    }
  }, [storesByUser])

  useEffect(() => {
    if (!selectedStore) {
      fetchStoresByUser()
    }
  }, [selectedStore])

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedBranch = event.target.value as string
    setSelectedStore(selectedBranch)

    const selectedStoreCode = storesByUser.find(
      (store) => store.storeBranch === selectedBranch,
    )?.storeCode
    if (selectedStoreCode) {
      updateSetStore(selectedStoreCode)
    }
  }

  return (
    <Box sx={{ minWidth }}>
      <FormControl fullWidth>
        <SelectStyled
          value={selectedStore}
          onChange={handleChange}
          sx={{
            height: heightSelect,
            fontSize,
          }}
        >
          {storesByUser?.map((item) => (
            <MenuItem
              sx={{ fontSize }}
              value={item.storeBranch}
              key={item.storeCode}
            >
              {item.storeBranch}
            </MenuItem>
          ))}
        </SelectStyled>
      </FormControl>
    </Box>
  )
}
