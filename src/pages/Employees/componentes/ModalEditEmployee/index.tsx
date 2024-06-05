import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { compareAsc, format, isAfter, min } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CgCloseO } from 'react-icons/cg'
import { IoIosAddCircle } from 'react-icons/io'
import { MdDeleteForever } from 'react-icons/md'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/components/Button'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatDate } from '@/libs/formatDate'
import { formatName } from '@/libs/formatName'

import { DatePickerEmployeeModal } from './components/DatePicker'
import { SelectOptions } from './components/Select'
import { WorkShift } from './components/WorkShift'
import {
  IArrayDayOff,
  IArrayVacation,
  IEmployee,
  infoEmployeeProps,
  ModalEditEmployeeProps,
} from './interfaces'
import { modalValidations } from './modalValidations'
import {
  ContainerDaysOff,
  ContainerModal,
  ContainerVacation,
  ContainerWorkShift,
  DividerVertical,
  FormModal,
  InfoEmployeeContainer,
  SelectDayoffContainer,
  SelectVacationContainer,
} from './styles'
import { validateDayOff } from './utils/validateDayOff'
import { validateVacations } from './utils/validateVacations'

export default function ModalEditEmployee(props: ModalEditEmployeeProps) {
  const { updateShiftRestSchedule } = useSettings()
  const { open, onHandleClose, employee } = props

  const { register, handleSubmit, reset } = useForm<infoEmployeeProps>()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [selectedStartVacation, setSelectedStartVacation] =
    useState<Date | null>(null)

  const [selectedFinishVacation, setSelectedFinishVacation] =
    useState<Date | null>(null)

  const [dayOff, setDayOff] = useState<Date | null>(null)
  const [arrayDaysOff, setArrayDaysOff] = useState<IArrayDayOff[] | null>([])
  const [copyArrayDaysOff, setCopyArrayDaysOff] = useState<
    IArrayDayOff[] | null
  >([])

  const [arrayVacations, setArrayVacations] = useState<IArrayVacation[] | null>(
    [],
  )
  const [copyArrayVacations, setCopyArrayVacations] = useState<
    IArrayVacation[] | null
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
    if (dayOff) {
      // E você quer extrair os períodos de férias de `employee`
      const arrayVacation = employee?.arrayVacation ?? []
      const validate = validateDayOff(dayOff, arrayVacation)

      if (validate) return
    }

    const id = uuidv4()

    if (!dayOff) {
      return toast.error('Informe uma data', {
        style: { height: '50px', padding: '15px' },
      })
    }

    /*  if (dayOff < currentDate) {
      return toast.error('Selecione uma data válida.', {
        style: { height: '50px', padding: '15px' },
      })
    } */

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

  function handleAddVacationOffInArray() {
    const errorValidate = validateVacations(
      selectedStartVacation,
      selectedFinishVacation,
    )

    if (errorValidate) {
      return
    }
    const id = uuidv4()

    if (selectedStartVacation && selectedFinishVacation) {
      setArrayVacations((prevArrayVacation) =>
        prevArrayVacation
          ? [
              ...prevArrayVacation,
              {
                id,
                startVacation: selectedStartVacation,
                finishVacation: selectedFinishVacation,
                type: 'I',
              },
            ]
          : [
              {
                startVacation: selectedStartVacation,
                finishVacation: selectedFinishVacation,
              },
            ],
      )

      setCopyArrayVacations((prevArrayVacation) =>
        prevArrayVacation
          ? [
              ...prevArrayVacation,
              {
                id,
                startVacation: selectedStartVacation,
                finishVacation: selectedFinishVacation,
                type: 'I',
              },
            ]
          : [
              {
                startVacation: selectedStartVacation,
                finishVacation: selectedFinishVacation,
              },
            ],
      )
    }

    setSelectedStartVacation(null)
    setSelectedFinishVacation(null)
  }

  function handleRemoveVacationInArray(id: string | undefined) {
    if (id) {
      if (arrayVacations) {
        const filteredEmployess = arrayVacations.filter(
          (employee) => employee.id?.toString() !== id,
        )
        setArrayVacations(filteredEmployess)
      }

      const idVacation = vacations?.find(
        (vacation) => vacation.id?.toString() === id,
      )

      if (idVacation) {
        setCopyArrayVacations(
          (prevArrayVacation) =>
            prevArrayVacation &&
            prevArrayVacation.map((item) =>
              item.id?.toString() === id ? { ...item, type: 'D' } : item,
            ),
        )
      } else {
        if (copyArrayVacations) {
          const filteredEmployess = copyArrayVacations?.filter((employee) => {
            return employee.id?.toString() !== id
          })

          setCopyArrayVacations(filteredEmployess)
        }
      }
    }
  }

  const sortArrayDaysOff = useCallback(() => {
    setArrayDaysOff((prevArray) => {
      const sortedArray =
        prevArray &&
        [...prevArray].sort((a, b) => {
          if (a.date === null && b.date === null) return 0
          if (a.date === null) return 1
          if (b.date === null) return -1
          return compareAsc(a.date, b.date)
        })
      return sortedArray
    })
  }, [copyArrayDaysOff])

  useEffect(() => {
    sortArrayDaysOff()
  }, [sortArrayDaysOff])

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
      arrayVacation: copyArrayVacations?.map((item) => ({
        id: item.type === 'I' ? undefined : Number(item.id),
        startVacation: formatDate(item.startVacation),
        finishVacation: formatDate(item.finishVacation),
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
      /*    onHandleClose() */
    }, 2000)
  }

  function handleCloseModal() {
    setSelectTypeRest('')
    setDayOff(null)
    setSelectedStartVacation(null)
    setSelectedFinishVacation(null)
    reset()
    onHandleClose()
  }

  const dateNextVacation = useMemo(() => {
    const currentDate = new Date()
    const dates: Date[] = []

    if (employee?.arrayVacation?.length === 0) {
      return ''
    }

    employee?.arrayVacation?.forEach((item) => {
      if (
        item.startVacation &&
        isAfter(new Date(item.startVacation), currentDate)
      ) {
        dates.push(new Date(item.startVacation))
      }
    })

    const nextVacation = min(dates)

    if (!isNaN(nextVacation.getTime())) {
      const dateFormated = format(nextVacation, 'dd/MM/yyyy')

      return dateFormated
    } else {
      return ''
    }
  }, [employee?.arrayVacation])

  /*   console.log('proximas ferias', dateNextVacation) */

  /*   const originalDateStartVacation =
    employee?.startVacation &&
    format(formatOriginalDate(new Date(employee?.startVacation)), 'dd/MM/yyyy') */

  /*   const originalDateStartVacation =
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
  }, [employee?.finishVacation]) */

  const vacations = useMemo(() => {
    const datesFormated = employee?.arrayVacation
      ? employee?.arrayVacation.map((item) => ({
          id: item.id,
          startVacation: item.startVacation
            ? new Date(item.startVacation)
            : null,
          finishVacation: item.finishVacation
            ? new Date(item.finishVacation)
            : null,
        }))
      : null

    return datesFormated
  }, [employee?.arrayVacation])

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
    setArrayVacations(vacations)
    setCopyArrayVacations(vacations)
    setArrayDaysOff(daysOff)
    setCopyArrayDaysOff(daysOff)
  }, [daysOff, vacations])

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
              <span>Próximas férias:</span> {dateNextVacation}
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
                <section className="container-vacation-button">
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
                  <button type="button" onClick={handleAddVacationOffInArray}>
                    <IoIosAddCircle size={30} color="#fff" />
                  </button>
                </section>

                <ContainerVacation>
                  <table>
                    {arrayVacations?.length ? (
                      <thead>
                        <tr>
                          <th>Início férias</th>
                          <th>Fim férias</th>
                          <th>Deletar</th>
                        </tr>
                      </thead>
                    ) : (
                      ''
                    )}
                    <tbody>
                      {arrayVacations?.map((item) => (
                        <tr key={`${item.id && item.id}`}>
                          <td>
                            {item.startVacation &&
                              formatInTimeZone(
                                item?.startVacation,
                                'UTC',
                                'dd/MM/yyyy',
                              )}
                          </td>
                          <td>
                            {item.finishVacation &&
                              formatInTimeZone(
                                item?.finishVacation,
                                'UTC',
                                'dd/MM/yyyy',
                              )}
                          </td>
                          <td>
                            <section
                              className="delete-vacation"
                              onClick={() =>
                                handleRemoveVacationInArray(item.id?.toString())
                              }
                            >
                              <MdDeleteForever />
                            </section>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ContainerVacation>
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

                  <button type="button" onClick={handleAddDayOffInArray}>
                    <IoIosAddCircle size={30} color="#fff" />
                  </button>
                </section>
                <ContainerDaysOff>
                  {arrayDaysOff?.map((item) => (
                    <section
                      key={`${item.id && item.id}`}
                      className="content-dayOff"
                    >
                      <p key={item.toString()}>
                        {item.date &&
                          formatInTimeZone(item?.date, 'UTC', 'dd/MM/yyyy')}
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
              <SelectDayoffContainer></SelectDayoffContainer>
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
