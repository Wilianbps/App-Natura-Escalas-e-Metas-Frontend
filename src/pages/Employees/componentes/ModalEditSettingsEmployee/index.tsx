import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { compareAsc, isAfter, min } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CgCloseO } from 'react-icons/cg'
import { IoIosAddCircle } from 'react-icons/io'
import { MdDeleteForever } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/components/Button'
import { useProfiles } from '@/contexts/profiles/ProfilesContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatDate } from '@/libs/formatDate'
import { formatName } from '@/libs/formatName'

import { ModalConfirmAddDayOff } from '../ModalConfirmAddDayOff'
import { DatePickerEmployeeModal } from './components/DatePicker'
import { SelectOptions } from './components/Select'
import { WorkShift } from './components/WorkShift'
import {
  IArrayDayOff,
  IArrayVacation,
  IEmployee,
  infoEmployeeProps,
  ModalEditSettingsEmployeeProps,
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
import { getEmployeesWithSameDayOff } from './utils/getEmployeesWithSameDayOff'
import { validateDayOff } from './utils/validateDayOff'
import { validateVacations } from './utils/validateVacations'

export default function ModalEditSettingsEmployee(
  props: ModalEditSettingsEmployeeProps,
) {
  const { store, cookieUserLogin } = useProfiles()
  const { updateShiftRestSchedule, employees } = useSettings()
  const { open, onHandleClose, employee } = props

  const { handleSubmit, reset } = useForm<infoEmployeeProps>()

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
  const [selectedShift, setSelectedShift] = useState<string | null>(
    employee?.shift || null,
  )

  const [
    isModalEmployeesWithSameDayOffOpen,
    setIsModalEmployeesWithSameDayOffOpen,
  ] = useState(false)
  const [employeesWithSameDayOff, setEmployeesWithSameDayOff] = useState<
    IEmployee[]
  >([])

  function handleShiftChange(shift: string | null) {
    if (employee) {
      employee.shift = shift
    }
    setSelectedShift(shift) // Atualiza o estado local do shift
  }

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

  function addDayOff() {
    const id = uuidv4()
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

  function handleAddDayOffInArray() {
    const arrayVacation = employee?.arrayVacation ?? []

    const validate = validateDayOff(
      dayOff as Date,
      arrayVacation,
      copyArrayDaysOff as [],
    )

    if (validate) return

    const employeesWithDayOff = getEmployeesWithSameDayOff(employees, dayOff)

    if (employeesWithDayOff.length > 0) {
      setEmployeesWithSameDayOff(employeesWithDayOff)
      setIsModalEmployeesWithSameDayOffOpen(true)
      return
    }
    addDayOff()
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

  function handleSaveForm() {
    setIsSubmitting(true)
    if (employee?.idShift) {
      switch (selectedShift) {
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
      storeCode: store,
      userLogin: cookieUserLogin,
      idShift: employee?.idShift,
      shift: selectedShift,
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
      setDayOff(null)
      setSelectedStartVacation(null)
      setSelectedFinishVacation(null)
      setSelectTypeRest('')
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
      const dateFormated = formatInTimeZone(nextVacation, 'UTC', 'dd/MM/yyyy')

      return dateFormated
    } else {
      return ''
    }
  }, [employee?.arrayVacation])

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
    if (employee) setSelectedShift(employee.shift)
  }, [employee])

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
              <span>Próxima ausência:</span> {dateNextVacation}
            </p>
          </div>
        </header>

        <FormModal onSubmit={handleSubmit(handleSaveForm)}>
          <SelectOptions
            selectTypeRest={selectTypeRest}
            onHandleSelectTypeRest={handleSelectTypeRest}
          />
          <InfoEmployeeContainer>
            {['ausencia', 'ferias'].includes(selectTypeRest) && (
              <SelectVacationContainer>
                <section className="container-vacation-button">
                  <DatePickerEmployeeModal
                    selectDate={selectedStartVacation}
                    onSelectDate={handleSelectStartVacation}
                    label="Início"
                  />
                  <DatePickerEmployeeModal
                    selectDate={selectedFinishVacation}
                    onSelectDate={handleSelectFinishVacation}
                    label="Fim"
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
                          <th>Início</th>
                          <th>Fim</th>
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
              <WorkShift
                initialShift={employee?.shift || null}
                onShiftChange={handleShiftChange}
              />
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
      <ModalConfirmAddDayOff
        open={isModalEmployeesWithSameDayOffOpen}
        onHandleClose={() => setIsModalEmployeesWithSameDayOffOpen(false)}
        employees={employeesWithSameDayOff}
        onConfirm={addDayOff}
        dayOff={dayOff}
      />
    </React.Fragment>
  )
}
