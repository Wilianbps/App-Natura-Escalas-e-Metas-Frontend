import {
  Box,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import React from 'react'
import { CgCloseO } from 'react-icons/cg'

import { Button } from '@/components/Button'

import { ModalAddEmployeeProps } from './interfaces'
import {
  ButtonsContainer,
  ContainerModal,
  Form,
  InputContainer,
} from './styles'

export function ModalAddEmployee(props: ModalAddEmployeeProps) {
  const { open, onHandleClose } = props
  return (
    <React.Fragment>
      <ContainerModal open={open} onClose={onHandleClose}>
        <header>
          <h3>Cadastrar Usuário</h3>
          <IconButton aria-label="close" onClick={onHandleClose}>
            <CgCloseO />
          </IconButton>
        </header>

        <main>
          <Form>
            <InputContainer>
              <TextField id="outlined-basic" label="Nome" variant="outlined" />
              <TextField id="outlined-basic" label="Cargo" variant="outlined" />
              <TextField
                id="outlined-basic"
                label="CPF"
                variant="outlined"
                sx={{ maxWidth: '300px' }}
              />
              <Box sx={{}}>
                <h4>Turnos</h4>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="selectedShift"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    '.MuiFormControlLabel-label': {
                      fontSize: '14px',
                    },
                  }}
                  /* value={selectedShift}
                onChange={handleChange} */
                >
                  <FormControlLabel
                    value="Matutino"
                    control={<Radio size="small" />}
                    label="Matutino (07:00 - 14:30)"
                  />
                  <FormControlLabel
                    value="Noturno"
                    control={<Radio size="small" />}
                    label="Noturno (14:30 - 22:00)"
                    sx={{ fontSize: '13px' }}
                  />
                  <FormControlLabel
                    value="Vespertino"
                    control={<Radio size="small" />}
                    label="Vespertino (11:00 - 18:30)"
                  />
                </RadioGroup>
              </Box>
            </InputContainer>

            <ButtonsContainer>
              <Button text="Limpar" bgColor="#ffe2b3" color="#000" />
              <Button text="Cadastrar" bgColor="#449428" color="#000" />
            </ButtonsContainer>
          </Form>
        </main>
      </ContainerModal>
    </React.Fragment>
  )
}
