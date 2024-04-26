import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CgCloseO } from 'react-icons/cg'
import { toast } from 'sonner'

import { Button } from '@/components/Button'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatArrayDate } from '@/libs/formatArrayDate'
import { formatDate } from '@/libs/formatDate'

import { DatePickerEmployeeModal } from './components/DatePicker'
import { SelectOptions } from './components/Select'
import { WorkShift } from './components/WorkShift'
import { IEmployee, ModalEditEmployeeProps } from './interfaces'
import { modalValidations } from './modalValidations'
import {
  ContainerDaysOff,
  ContainerModal,
  ContainerWorkShift,
  DividerVertical,
  FormModal,
  InfoEmployeeContainer,
  SelectDayoffContainer,
  SelectVacationContainer,
} from './styles'

interface infoEmployeeProps {
  selectedShift: string | null
}

export default function ModalEditEmployee(props: ModalEditEmployeeProps) {
  const { updateShiftRestSchedule } = useSettings()
  const { open, onHandleClose } = props

  const { register, handleSubmit, reset } = useForm<infoEmployeeProps>()

  const [selectedStartVacation, setSelectedStartVacation] =
    useState<Date | null>(null)

  const [selectedFinishVacation, setSelectedFinishVacation] =
    useState<Date | null>(null)

  const [dayOff, setDayOff] = useState<Date | null>(null)
  const [arrayDaysOff, setArrayDaysOff] = useState<Date[] | null>([])

  const [selectTypeRest, setSelectTypeRest] = useState('')

  function handleSelectTypeRest(type: string) {
    setSelectTypeRest(type)
  }

  function handleSelectStartVacation(date: Date | null) {
    setSelectedStartVacation(date)
  }

  function handleSelectFinishVacation(date: Date | null) {
    setSelectedFinishVacation(date)
  }

  function handleSelectDayOff(date: Date | null) {
    setDayOff(date)
  }

  function handleAddDayOffInArray() {
    if (!dayOff) {
      toast.error('Informe uma data', {
        style: { height: '50px', padding: '15px' },
      })
      return
    }
    if (dayOff) {
      setArrayDaysOff((prevArrayDaysOff) =>
        prevArrayDaysOff ? [...prevArrayDaysOff, dayOff] : [dayOff],
      )
    }
    setDayOff(null)
  }

  function handleClearSelectedDaysOff() {
    setArrayDaysOff([])
    setDayOff(null)
  }

  function handleSaveForm(employee: infoEmployeeProps) {
    const updateEmployee: IEmployee = {
      shift: employee.selectedShift,
      startVacation: formatDate(selectedStartVacation),
      finishVacation: formatDate(selectedFinishVacation),
      arrayDaysOff: formatArrayDate(arrayDaysOff),
    }
    const validationError = modalValidations(updateEmployee)

    if (validationError) {
      return
    }

    console.log('data', updateEmployee)

    updateShiftRestSchedule(updateEmployee)

    reset()
    onHandleClose()
  }

  return (
    <React.Fragment>
      <ContainerModal
        onClose={onHandleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <header>
          <div>
            <DialogTitle
              sx={{ m: 0, p: 2, fontSize: '0.875rem', fontWeight: 'bold' }}
              id="customized-dialog-title"
            >
              Ana Luíza Ribeiro
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={onHandleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CgCloseO />
            </IconButton>
          </div>
          <div className="infoEmployee">
            <p>
              <span>ID Funcional:</span> 00040
            </p>
            <p>
              <span>cargo:</span> 00040
            </p>
            <p>
              <span>Próximas férias:</span> 01/04/2024
            </p>
          </div>
        </header>

        <FormModal onSubmit={handleSubmit(handleSaveForm)}>
          <SelectOptions
            selectTypeRest={selectTypeRest}
            onHandleSelectTypeRest={handleSelectTypeRest}
          />
          <InfoEmployeeContainer>
            {selectTypeRest === 'ferias' && (
              <SelectVacationContainer>
                <DatePickerEmployeeModal
                  selectDate={selectedStartVacation}
                  onSelectDate={handleSelectStartVacation}
                  label="Início Férias"
                />
                <DatePickerEmployeeModal
                  selectDate={selectedFinishVacation}
                  onSelectDate={handleSelectFinishVacation}
                  label="Fim Férias"
                />
              </SelectVacationContainer>
            )}

            {selectTypeRest === 'folga' && (
              <SelectDayoffContainer>
                <section className="container-selectDayOff-button">
                  <DatePickerEmployeeModal
                    selectDate={dayOff}
                    onSelectDate={handleSelectDayOff}
                    label="Folga"
                  />
                  <Button
                    type="button"
                    text="Adicionar"
                    color="#449428"
                    bgColor="#fff"
                    onClick={handleAddDayOffInArray}
                  />
                  <Button
                    type="button"
                    text="Limpar"
                    color="#FF9E00"
                    bgColor="#fff"
                    onClick={handleClearSelectedDaysOff}
                  />
                </section>
                <ContainerDaysOff>
                  {arrayDaysOff?.map((item) => (
                    <p key={item.toString()}>{item.toLocaleDateString()}</p>
                  ))}
                </ContainerDaysOff>
              </SelectDayoffContainer>
            )}

            {selectTypeRest === '' && (
              <SelectVacationContainer></SelectVacationContainer>
            )}
            <DividerVertical />
            <ContainerWorkShift>
              <WorkShift register={register} />
            </ContainerWorkShift>
          </InfoEmployeeContainer>
          <Button
            type="submit"
            text="Salvar"
            color="#FFFFFF"
            bgColor="#FF9E00"
          />
        </FormModal>
      </ContainerModal>
    </React.Fragment>
  )
}
