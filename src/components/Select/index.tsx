import { Box, FormControl, MenuItem, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

import { SelectStoresProps } from './interfaces'
import { SelectStyled } from './styles'

export function SelectStores(props: SelectStoresProps) {
  const { minWidth, heightSelect, fontSize } = props

  const [store, setStore] = useState<string>('Loja Iguatemi')

  const handleChange = (event: SelectChangeEvent<string>) => {
    setStore(event.target.value as string)
  }
  return (
    <Box sx={{ minWidth }}>
      <FormControl fullWidth>
        <SelectStyled
          value={store}
          onChange={(event) => handleChange(event as SelectChangeEvent<string>)}
          sx={{
            height: heightSelect,
            fontSize,
          }}
        >
          <MenuItem sx={{ fontSize }} value="Loja Iguatemi">
            Loja Iguatemi
          </MenuItem>
          <MenuItem sx={{ fontSize }} value="Loja 2">
            Loja2
          </MenuItem>
          <MenuItem sx={{ fontSize }} value="Loja 3">
            Loja3
          </MenuItem>
        </SelectStyled>
      </FormControl>
    </Box>
  )
}
