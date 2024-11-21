import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CgCloseO } from 'react-icons/cg'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { useSettings } from '@/contexts/setting/SettingContext'
import { insertMaskInCpf } from '@/libs/cpf'

import { ModalAddEmployeeProps } from './interfaces'
import { positions } from './positions'
import {
  ButtonsContainer,
  ContainerModal,
  Form,
  InputContainer,
} from './styles'

const schemaForm = z.object({
  name: z.string().min(1, 'Por favor, informe o nome do colaborador'),
  position: z.enum(positions, {
    errorMap: () => ({ message: 'Por favor, selecione um cargo válido' }),
  }),
  cpf: z
    .string()
    .min(14, 'Por favor, informe um CPF válido')
    .refine(
      (value) => {
        const unmaskedCpf = value.replace(/\D/g, '') // Remove pontos e hífen para validação
        return unmaskedCpf.length === 11
      },
      { message: 'CPF inválido' },
    ),
  selectedShift: z.string().min(1, 'Por favor, selecione um turno'),
})

type FormProps = {
  name: string
  position: '' | (typeof positions)[number] // Adiciona "" ou os cargos válidos
  cpf: string
  selectedShift: string
}

export function ModalAddEmployee(props: ModalAddEmployeeProps) {
  const { addEmployee } = useSettings()
  const { open, onHandleClose } = props

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    register,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: '',
      position: '',
      cpf: '',
      selectedShift: '',
    },
  })

  function handleCloseModal() {
    onHandleClose()
    handleClearForm()
  }

  function handleForm(infoEmployee: FormProps) {
    setIsSubmitting(true)

    const employee = {
      name: infoEmployee.name,
      position: infoEmployee.position,
      cpf: infoEmployee.cpf,
      selectedShift:
        infoEmployee.selectedShift === 'Matutino'
          ? 1
          : infoEmployee.selectedShift === 'Vespertino'
            ? 2
            : infoEmployee.selectedShift === 'Noturno' && 3,
    }

    setTimeout(() => {
      addEmployee(employee)
      setIsSubmitting(false)
      handleCloseModal()
    }, 2000)
  }

  function handleClearForm() {
    reset()
    clearErrors()
  }

  return (
    <React.Fragment>
      <ContainerModal open={open} onClose={handleCloseModal}>
        <header>
          <h3>Cadastrar Usuário</h3>
          <IconButton aria-label="close" onClick={handleCloseModal}>
            <CgCloseO />
          </IconButton>
        </header>

        <main>
          <Form onSubmit={handleSubmit(handleForm)}>
            <InputContainer>
              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                error={!!errors.name}
                {...register('name')}
              />
              {errors.name?.message && (
                <Typography sx={{ color: 'red' }}>
                  {errors.name?.message}
                </Typography>
              )}

              <section className="position-cpf-container">
                <section className="position-content">
                  <Box sx={{ minWidth: 280 }}>
                    <FormControl fullWidth error={!!errors.position}>
                      <InputLabel>Cargo</InputLabel>
                      <Select label="Cargo" {...register('position')}>
                        <MenuItem value="" disabled>
                          Selecione um cargo
                        </MenuItem>
                        {/*  <MenuItem value="Apoio">Apoio</MenuItem>
                        <MenuItem value="VR">VR</MenuItem>
                        <MenuItem value="Estoquista">Estoquista</MenuItem>
                        <MenuItem value="Vendedor">Vendedor</MenuItem> */}
                        {positions.map((position) => (
                          <MenuItem key={position} value={position}>
                            {position}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <div className="error-message">
                    {errors.position?.message && (
                      <Typography sx={{ color: 'red' }}>
                        {errors.position?.message}
                      </Typography>
                    )}
                  </div>
                </section>

                <section className="cpf-content">
                  <Controller
                    name="cpf"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors.cpf}
                        label="CPF"
                        variant="outlined"
                        sx={{ minWidth: '280px' }}
                        onChange={(e) => {
                          const maskedCpf = insertMaskInCpf(
                            e.target.value.replace(/\D/g, ''),
                          )
                          field.onChange(maskedCpf)
                        }}
                      />
                    )}
                  />

                  <div className="error-message">
                    {errors.cpf?.message && (
                      <Typography sx={{ color: 'red' }}>
                        {errors.cpf?.message}
                      </Typography>
                    )}
                  </div>
                </section>
              </section>

              <Box sx={{ mb: 2 }}>
                <h4>Turnos</h4>
                {/* Controlador para o RadioGroup */}
                <Controller
                  name="selectedShift"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      aria-labelledby="demo-radio-buttons-group-label"
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        '.MuiFormControlLabel-label': {
                          fontSize: '14px',
                        },
                      }}
                    >
                      <FormControlLabel
                        value="Matutino"
                        control={<Radio size="small" />}
                        label="Matutino (07:00 - 14:30)"
                      />
                      <FormControlLabel
                        value="Vespertino"
                        control={<Radio size="small" />}
                        label="Vespertino (11:00 - 18:30)"
                      />
                      <FormControlLabel
                        value="Noturno"
                        control={<Radio size="small" />}
                        label="Noturno (14:30 - 22:00)"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.selectedShift?.message && (
                  <Typography sx={{ color: 'red' }}>
                    {errors.selectedShift?.message}
                  </Typography>
                )}
              </Box>
            </InputContainer>

            <ButtonsContainer>
              <Button
                type="button"
                text="Limpar"
                bgColor="#ffe2b3"
                color="#000"
                onClick={handleClearForm}
              />
              <Button
                text="Cadastrar"
                bgColor="#449428"
                color="#000"
                width="140px"
                type="submit"
                isSubmitting={isSubmitting}
              />
            </ButtonsContainer>
          </Form>
        </main>
      </ContainerModal>
    </React.Fragment>
  )
}
