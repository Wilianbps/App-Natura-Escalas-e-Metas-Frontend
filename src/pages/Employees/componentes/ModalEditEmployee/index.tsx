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
import { toZonedTime } from 'date-fns-tz'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CgCloseO } from 'react-icons/cg'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { useSettings } from '@/contexts/setting/SettingContext'
import { insertMaskInCpf } from '@/libs/cpf'
import { formatName } from '@/libs/formatName'

import { DatePickerRegisterEmployee } from '../DatePickerRegisterEmployee'
import { ModalEditEmployeeProps } from './interfaces'
import { positions } from './positions'
import {
  ButtonsContainer,
  ContainerModal,
  Form,
  InputContainer,
} from './styles'

const schemaForm = z.object({
  name: z.string().min(1, 'Por favor, informe o nome do colaborador'),
  position: z
    .union([
      z.enum(positions, {
        errorMap: () => ({ message: 'Por favor, selecione um cargo válido' }),
      }),
      z.literal(''), // Adiciona string vazia
    ])
    .refine((value) => value !== '', {
      message: 'Por favor, selecione um cargo',
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

export function ModalEditEmployee(props: ModalEditEmployeeProps) {
  const { updateEmployee, shifts } = useSettings()
  const { open, onHandleClose, employee } = props

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

  useEffect(() => {
    if (open && employee) {
      const validPosition = positions.find((pos) => pos === employee.office)

      const startDate = employee.startDate
        ? toZonedTime(employee.startDate, '')
        : null

      reset({
        name: formatName(employee.name) || '',
        position: validPosition,
        cpf: insertMaskInCpf(employee.cpf || ''),
        date: startDate,
        selectedShift:
          employee.idShift === 1
            ? 'Matutino'
            : employee.idShift === 2
              ? 'Vespertino'
              : employee.idShift === 3
                ? 'Noturno'
                : '',
      })
    }
  }, [open, employee, reset])

  function handleCloseModal() {
    onHandleClose()
    handleClearForm()
  }

  function handleForm(infoEmployee: FormProps) {
    setIsSubmitting(true)

    const employeeId = employee?.idSeler

    const employeeData = {
      name: infoEmployee.name.toUpperCase(),
      position: infoEmployee.position,
      cpf: infoEmployee.cpf,
      startDate: infoEmployee.date,
      selectedShift:
        infoEmployee.selectedShift === 'Matutino'
          ? 1
          : infoEmployee.selectedShift === 'Vespertino'
            ? 2
            : infoEmployee.selectedShift === 'Noturno' && 3,
    }

    setTimeout(() => {
      updateEmployee(employeeId, employeeData)
      setIsSubmitting(false)
    }, 2000)
  }

  function handleClearForm() {
    reset({
      name: '',
      position: '',
      cpf: '',
      date: null,
      selectedShift: '',
    })
    clearErrors()
  }

  return (
    <React.Fragment>
      <ContainerModal open={open} onClose={handleCloseModal}>
        <header>
          <h3>Editar Usuário</h3>
          <IconButton aria-label="close" onClick={handleCloseModal}>
            <CgCloseO />
          </IconButton>
        </header>

        <main>
          <Form onSubmit={handleSubmit(handleForm)}>
            <InputContainer error={!!errors.cpf || !!errors.position}>
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
                      <Controller
                        name="position"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field} // Controla o valor com react-hook-form
                            value={field.value ?? ''}
                            label="Cargo"
                          >
                            <MenuItem value="" disabled>
                              Selecione um cargo
                            </MenuItem>
                            {positions.map((position) => (
                              <MenuItem key={position} value={position}>
                                {position}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
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
                text="Alterar"
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
