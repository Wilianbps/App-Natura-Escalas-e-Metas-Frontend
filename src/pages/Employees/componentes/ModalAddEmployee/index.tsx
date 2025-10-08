import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Checkbox,
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
import { insertMaskInCpf, isValidCpf } from '@/libs/cpf'

import { DatePickerRegisterEmployee } from '../DatePickerRegisterEmployee'
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
        const unmaskedCpf = value.replace(/\D/g, '')
        return unmaskedCpf.length === 11 && isValidCpf(value)
      },
      { message: 'CPF inválido' },
    ),
  date: z
    .date()
    .nullable()
    .refine((date) => date !== null, 'Por favor, selecione uma data válida'),
  selectedShift: z.string().min(1, 'Por favor, selecione um turno'),
})

type FormProps = {
  name: string
  position: '' | (typeof positions)[number] // Adiciona "" ou os cargos válidos
  cpf: string
  date: Date | null
  selectedShift: string
}

export function ModalAddEmployee(props: ModalAddEmployeeProps) {
  const { addEmployee, shifts } = useSettings()
  const { open, onHandleClose } = props

  const [extraEmployee, setExtraEmployee] = useState<boolean>(false)
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
      date: null,
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
      startDate: infoEmployee.date,
      extraEmployee: extraEmployee === true ? 1 : 0,
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
            <InputContainer error={!!errors.cpf || !!errors.position}>
              <TextField
                sx={{ minWidth: 280 }}
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

              <section className="date-employee-container">
                <section className="date-content">
                  <DatePickerRegisterEmployee
                    control={control}
                    label="Data de Início"
                    defaultValue={null}
                  />

                  {errors.date?.message && (
                    <Typography sx={{ color: 'red' }}>
                      {errors.date?.message}
                    </Typography>
                  )}
                </section>

                <section>
                  <Checkbox
                    onChange={() => setExtraEmployee(!extraEmployee)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <span className="extra_employee">Vendedor extra *</span>
                </section>
              </section>
              <span>
                <b>* Obs:</b> Use a flag <b>Vendedor extra</b> somente para
                adicionar a meta de um novo vendedor que entrou após finalizar a
                escala. Essa meta é exclusiva dele e não será dividida com os
                outros vendedores.
              </span>
              <Box sx={{ mb: 2 }}>
                <h4>Turnos</h4>
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
                        label={`Matutino (${shifts.morning?.startTime} - ${shifts.morning?.endTime})`}
                      />
                      <FormControlLabel
                        value="Vespertino"
                        control={<Radio size="small" />}
                        label={`Vespertino (${shifts.afternoon?.startTime} - ${shifts.afternoon?.endTime})`}
                      />
                      <FormControlLabel
                        value="Noturno"
                        control={<Radio size="small" />}
                        label={`Noturno (${shifts.nocturnal?.startTime} - ${shifts.nocturnal?.endTime})`}
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
