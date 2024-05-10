import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { format } from 'date-fns'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CgCloseO } from 'react-icons/cg'
import { MdDeleteForever } from 'react-icons/md'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/components/Button'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatDate } from '@/libs/formatDate'
import { formatOriginalDate } from '@/libs/formatHour'
import { formatName } from '@/libs/formatName'

import { DatePickerEmployeeModal } from './components/DatePicker'
import { SelectOptions } from './components/Select'
import { WorkShift } from './components/WorkShift'
import {
  IArrayDaysOff,
  IEmployee,
  infoEmployeeProps,
  ModalEditEmployeeProps,
} from './interfaces'
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

export default function ModalEditEmployee(props: ModalEditEmployeeProps) {
  const { updateShiftRestSchedule } = useSettings()
  const { open, onHandleClose, employee } = props

  console.log('employee', employee)

  const { register, handleSubmit, reset } = useForm<infoEmployeeProps>()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [selectedStartVacation, setSelectedStartVacation] =
    useState<Date | null>(null)

  const [selectedFinishVacation, setSelectedFinishVacation] =
    useState<Date | null>(null)

  const [dayOff, setDayOff] = useState<Date | null>(null)
  const [arrayDaysOff, setArrayDaysOff] = useState<IArrayDaysOff[] | null>([])
  const [copyArrayDaysOff, setCopyArrayDaysOff] = useState<
    IArrayDaysOff[] | null
  >([])

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
    const id = uuidv4()
    const currentDate = new Date()
    if (!dayOff) {
      return toast.error('Informe uma data', {
        style: { height: '50px', padding: '15px' },
      })
    }

    if (dayOff < currentDate) {
      return toast.error('Selecione uma data válida.', {
        style: { height: '50px', padding: '15px' },
      })
    }

    if (dayOff) {
      setArrayDaysOff((prevArrayDaysOff) =>
        prevArrayDaysOff
          ? [...prevArrayDaysOff, { id, date: dayOff, type: 'I' }]
          : [{ date: dayOff }],
      )

      setCopyArrayDaysOff((prevArrayDaysOff) =>
        prevArrayDaysOff
          ? [...prevArrayDaysOff, { id, date: dayOff, type: 'I' }]
          : [{ date: dayOff }],
      )
    }
    setDayOff(null)
  }

  function handleRemoveDayOffInArray(id: string | undefined) {
    if (id) {
      if (arrayDaysOff) {
        const filteredEmployess = arrayDaysOff.filter(
          (employee) => employee.id?.toString() !== id,
        )
        setArrayDaysOff(filteredEmployess)
      }

      const idDayOff = daysOff?.find((dayOff) => dayOff.id?.toString() === id)

      if (idDayOff) {
        setCopyArrayDaysOff(
          (prevArrayDaysOff) =>
            prevArrayDaysOff &&
            prevArrayDaysOff.map((item) =>
              item.id?.toString() === id ? { ...item, type: 'D' } : item,
            ),
        )
      } else {
        if (copyArrayDaysOff) {
          const filteredEmployess = copyArrayDaysOff?.filter((employee) => {
            return employee.id?.toString() !== id
          })

          setCopyArrayDaysOff(filteredEmployess)
        }
      }
    }
  }

  function handleClearSelectedDaysOff() {
    setDayOff(null)
    setSelectedStartVacation(null)
    setSelectedFinishVacation(null)
  }

  function handleSaveForm(register: infoEmployeeProps) {
    setIsSubmitting(true)
    if (employee?.idShift) {
      switch (register.selectedShift) {
        case 'Matutino':
          employee.idShift = 1
          break
        case 'Vespertino':
          employee.idShift = 2
          break
        case 'Noturno':
          employee.idShift = 3
          break
      }
    }

    const updateEmployee: IEmployee = {
      idSeler: employee?.idSeler,
      idDayOff: employee?.idDayOff,
      storeCode: '000008',
      userLogin: 'DGCS',
      idShift: employee?.idShift,
      shift: register.selectedShift,
      startVacation: formatDate(selectedStartVacation),
      finishVacation: formatDate(selectedFinishVacation),
      arrayDaysOff: copyArrayDaysOff?.map((item) => ({
        id: item.type === 'I' ? undefined : Number(item.id),
        date: formatDate(item.date),
        type: item.type ? item.type : '',
      })),
    }

    const validationError = modalValidations(updateEmployee)

    if (validationError) {
      setIsSubmitting(false)
      return
    }

    setTimeout(() => {
      updateShiftRestSchedule(updateEmployee)
      setIsSubmitting(false)
      reset()
      setDayOff(null)
      setSelectedStartVacation(null)
      setSelectedFinishVacation(null)
      setSelectTypeRest('')
      onHandleClose()
    }, 2000)
  }

  function handleCloseModal() {
    setSelectTypeRest('')
    setDayOff(null)
    reset()
    onHandleClose()
  }

  const originalDateStartVacation =
    employee?.startVacation &&
    format(formatOriginalDate(new Date(employee?.startVacation)), 'dd/MM/yyyy')

  const startVacation = useMemo(() => {
    const date: Date | null = employee?.startVacation
      ? formatOriginalDate(new Date(employee?.startVacation))
      : null

    return date
  }, [employee?.startVacation])

  const finishVacation = useMemo(() => {
    const date: Date | null = employee?.finishVacation
      ? formatOriginalDate(new Date(employee?.finishVacation))
      : null
    return date
  }, [employee?.finishVacation])

  const daysOff = useMemo(() => {
    const datesFormated = employee?.arrayDaysOff
      ? employee?.arrayDaysOff.map((item) => ({
          id: item.id,
          date: item.date ? new Date(item.date) : null,
        }))
      : null
    return datesFormated
  }, [employee?.arrayDaysOff])

  useEffect(() => {
    setSelectedStartVacation(startVacation)
    setSelectedFinishVacation(finishVacation)
    setArrayDaysOff(daysOff)
    setCopyArrayDaysOff(daysOff)
  }, [startVacation, finishVacation, daysOff])

  return (
    <React.Fragment>
      <ContainerModal
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <header>
          <div>
            <DialogTitle
              sx={{ m: 0, p: 2, fontSize: '0.875rem', fontWeight: 'bold' }}
              id="customized-dialog-title"
            >
              {formatName(employee?.name)}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
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
              <span>ID Funcional:</span> {employee?.idSeler}
            </p>
            <p>
              <span>cargo:</span> {formatName(employee?.office)}
            </p>
            <p>
              <span>Próximas férias:</span> {originalDateStartVacation}
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
                </section>
                <ContainerDaysOff>
                  {arrayDaysOff?.map((item) => (
                    <section
                      key={`${item.id && item.id}`}
                      className="content-dayOff"
                    >
                      <p key={item.toString()}>
                        {item.date && item.date.toLocaleDateString()}
                      </p>
                      <section
                        className="delete-dayOff"
                        onClick={() =>
                          handleRemoveDayOffInArray(item.id?.toString())
                        }
                      >
                        <MdDeleteForever />
                      </section>
                    </section>
                  ))}
                </ContainerDaysOff>
              </SelectDayoffContainer>
            )}

            {selectTypeRest === '' && (
              <SelectVacationContainer></SelectVacationContainer>
            )}
            <DividerVertical />
            <ContainerWorkShift>
              <WorkShift register={register} shift={employee?.shift} />
            </ContainerWorkShift>
          </InfoEmployeeContainer>
          <section className="buttons-clear-save">
            <Button
              type="button"
              text="Limpar"
              color="#FF9E00"
              bgColor="#fff"
              onClick={handleClearSelectedDaysOff}
            />
            <Button
              text="Salvar"
              color="#FFF"
              bgColor="#449428"
              width="100px"
              isSubmitting={isSubmitting}
            />
          </section>
        </FormModal>
      </ContainerModal>
    </React.Fragment>
  )
}
