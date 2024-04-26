import { Box, FormControl, MenuItem, SelectChangeEvent } from '@mui/material'

import { SelectStyled } from './styles'

export interface SelectOptionsProps {
  selectTypeRest: string
  onHandleSelectTypeRest: (type: string) => void
}

export function SelectOptions(props: SelectOptionsProps) {
  const { onHandleSelectTypeRest, selectTypeRest } = props

  const handleChange = (event: SelectChangeEvent<string>) => {
    onHandleSelectTypeRest(event.target.value as string)
  }
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <SelectStyled
          displayEmpty
          value={selectTypeRest}
          placeholder="Selecione uma ação"
          onChange={(event) => handleChange(event as SelectChangeEvent<string>)}
          sx={{
            height: '30px',
            fontSize: '13px',
            width: '200px',
          }}
        >
          <MenuItem disabled value="" sx={{ fontSize: '13px' }}>
            <span>Selecione uma ação</span>
          </MenuItem>
          <MenuItem sx={{ fontSize: '13px' }} value="ferias">
            Férias
          </MenuItem>
          <MenuItem sx={{ fontSize: '13px' }} value="folga">
            Folga
          </MenuItem>
        </SelectStyled>
      </FormControl>
    </Box>
  )
}
