import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CgCloseO } from 'react-icons/cg'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { useSettings } from '@/contexts/setting/SettingContext'

import { hours, type StartHoursType } from './hours'
import { ModalEditEmployeeProps } from './interfaces'
import { ButtonsContainer, ContainerModal, Form } from './styles'

const MIN_POSITIONS_AHEAD = 17 // 8,5 horas equivalem a 17 posições no array

const getHourIndex = (hour: (typeof hours)[number]) => hours.indexOf(hour)

const createShiftSchema = (shiftName: string) =>
  z
    .object({
      startTime: z.enum(hours),
      endTime: z.enum(hours),
    })
    .refine(
      (data) => {
        const startIndex = getHourIndex(data.startTime)
        const endIndex = getHourIndex(data.endTime)
        return endIndex - startIndex >= MIN_POSITIONS_AHEAD
      },
      {
        message: `O turno ${shiftName} precisa ter um intervalo de pelo menos 8,5 horas`,
        path: ['endTime'],
      },
    )

const schemaForm = z.object({
  morning: createShiftSchema('matutino'),
  afternoon: createShiftSchema('vespertino'),
  nocturnal: createShiftSchema('noturno'),
})

type FormData = z.infer<typeof schemaForm>

export function ModalSettingShifts(props: ModalEditEmployeeProps) {
  const { shifts, updateSettingShifts } = useSettings()
  const { open, onHandleClose } = props
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm),
    values: {
      morning: {
        startTime: shifts.morning.startTime as StartHoursType,
        endTime: shifts.morning.endTime as StartHoursType,
      },
      afternoon: {
        startTime: shifts.afternoon.startTime as StartHoursType,
        endTime: shifts.afternoon.endTime as StartHoursType,
      },
      nocturnal: {
        startTime: shifts.nocturnal.startTime as StartHoursType,
        endTime: shifts.nocturnal.endTime as StartHoursType,
      },
    },
  })

  function handleCloseModal() {
    onHandleClose()
    reset()
  }

  function handleSaveForm(data: FormData) {
    setTimeout(() => {
      updateSettingShifts(data)
      setIsSubmitting(false)
      handleCloseModal()
    }, 2000)
    setIsSubmitting(true)
  }

  return (
    <React.Fragment>
      <ContainerModal open={open} onClose={handleCloseModal}>
        <header>
          <h3>Configurar Turnos</h3>
          <IconButton aria-label="close" onClick={handleCloseModal}>
            <CgCloseO />
          </IconButton>
        </header>

        <main>
          <Form onSubmit={handleSubmit(handleSaveForm)}>
            <div className="shift-container">
              <p>Matutino</p>
              <div className="shift-container-error">
                <div className="shift-content">
                  <FormControl>
                    <InputLabel>Início</InputLabel>
                    <Controller
                      name="morning.startTime"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Início"
                          sx={{ minWidth: 160 }}
                        >
                          {hours.map((hour) => (
                            <MenuItem key={hour} value={hour}>
                              {hour}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormControl error={!!errors.morning}>
                    <InputLabel>Fim</InputLabel>
                    <Controller
                      name="morning.endTime"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} label="Fim" sx={{ minWidth: 160 }}>
                          {hours.map((hour) => (
                            <MenuItem key={hour} value={hour}>
                              {hour}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </div>
                <div>
                  {errors.morning?.endTime?.message && (
                    <Typography
                      sx={{
                        color: 'red',
                        fontSize: '14px',
                        maxWidth: '350px',
                      }}
                    >
                      {errors.morning?.endTime?.message}
                    </Typography>
                  )}
                </div>
              </div>
            </div>

            <div className="shift-container">
              <p>Vespertino</p>
              <div className="shift-container-error">
                <div className="shift-content">
                  <FormControl>
                    <InputLabel>Início</InputLabel>
                    <Controller
                      name="afternoon.startTime"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Início"
                          sx={{ minWidth: 160 }}
                        >
                          {hours.map((hour) => (
                            <MenuItem key={hour} value={hour}>
                              {hour}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormControl error={!!errors.afternoon}>
                    <InputLabel>Fim</InputLabel>
                    <Controller
                      name="afternoon.endTime"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} label="Fim" sx={{ minWidth: 160 }}>
                          {hours.map((hour) => (
                            <MenuItem key={hour} value={hour}>
                              {hour}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </div>
                <div>
                  {errors.afternoon?.endTime?.message && (
                    <Typography
                      sx={{
                        color: 'red',
                        fontSize: '14px',
                        maxWidth: '350px',
                      }}
                    >
                      {errors.afternoon?.endTime?.message}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
            <div className="shift-container">
              <p>Noturno</p>
              <div className="shift-container-error">
                <div className="shift-content">
                  <FormControl>
                    <InputLabel>Início</InputLabel>
                    <Controller
                      name="nocturnal.startTime"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Início"
                          sx={{ minWidth: 160 }}
                        >
                          {hours.map((hour) => (
                            <MenuItem key={hour} value={hour}>
                              {hour}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormControl error={!!errors.nocturnal}>
                    <InputLabel>Fim</InputLabel>
                    <Controller
                      name="nocturnal.endTime"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} label="Fim" sx={{ minWidth: 160 }}>
                          {hours.map((hour) => (
                            <MenuItem key={hour} value={hour}>
                              {hour}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </div>
                <div>
                  {errors.nocturnal?.endTime?.message && (
                    <Typography
                      sx={{
                        color: 'red',
                        fontSize: '14px',
                        maxWidth: '350px',
                      }}
                    >
                      {errors.nocturnal?.endTime?.message}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
            <ButtonsContainer>
              <Button
                text="Salvar"
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
