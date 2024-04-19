import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import React, { useState } from 'react'
import { CgCloseO } from 'react-icons/cg'

import { Button } from '@/components/Button'

import { DatePickerEmployeeModal } from './components/DatePicker'
import { SelectOptions } from './components/Select'
import { WorkShift } from './components/WorkShift'
import {
  ContainerDaysOff,
  ContainerModal,
  ContainerWorkShift,
  ContentModal,
  DividerVertical,
  InfoEmployeeContainer,
  SelectDayoffContainer,
  SelectVacationContainer,
} from './styles'

interface ModalEditEmployeeProps {
  open: boolean
  onHandleClose: () => void
}

export default function ModalEditEmployee(props: ModalEditEmployeeProps) {
  const { open, onHandleClose } = props

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
      alert('Informe uma data')
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

        <ContentModal>
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
                    text="Adicionar"
                    color="#FFFFFF"
                    bgColor="#449428"
                    onClick={handleAddDayOffInArray}
                  />
                  <Button
                    text="Limpar"
                    color="#FFFFFF"
                    bgColor="#FF9E00"
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
              <WorkShift />
            </ContainerWorkShift>
          </InfoEmployeeContainer>
        </ContentModal>
        <DialogActions>
          <Button
            text="Salvar"
            color="#FFFFFF"
            bgColor="#FF9E00"
            onClick={onHandleClose}
          />
        </DialogActions>
      </ContainerModal>
    </React.Fragment>
  )
}
