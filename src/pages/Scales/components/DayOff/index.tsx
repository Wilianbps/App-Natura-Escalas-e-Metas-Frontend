import { CircularProgress } from '@mui/material'
import { pdf } from '@react-pdf/renderer'
import React, { useMemo, useState } from 'react'
import { CgPrinter } from 'react-icons/cg'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { toast } from 'sonner'

import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { useProfiles } from '@/contexts/profiles/ProfilesContext'
import { useScales } from '@/contexts/scale/ScalesContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'

import { PaginationByFortnight } from './components/PaginationByFortnight'
import { ScaleByFortnightPDF } from './components/ScaleByFortnightPDF'
import {
  Container,
  ContainerDayOffPdf,
  ContainerTable,
  Footer,
  SelectStyled,
} from './styles'
import { splitDaysOfMonthIntoTwoParts } from './utils/splitDaysOfMonthIntoTwoParts'

type ChangeType = {
  type: 'I' | 'D'
  newStatus: number
  absenceId: number | null
  date: string
}

type ChangesState = Record<
  string,
  { name: string; days: Record<number, ChangeType> }
>

interface EmployeeDay {
  status: number
  activeDays?: number
  absenceId?: number | null
  date: string
}

interface Employee {
  id: number
  name: string
  days: (EmployeeDay | null)[]
}

export function DayOff() {
  const {
    scalesByMonthDate,
    isLoadingMonthScale,
    updateSetScalesByMonthDate,
    updateScalesByMonthDate,
    dataFinishScale,
  } = useScales()

  const { cookieProfile } = useProfiles()
  const { monthValue } = useSettings()
  const currentDate = new Date()
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const currentYear = currentDate.getFullYear().toString()
  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  const [modalMessage, setModalMessage] = useState<Array<string>>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isLoadingPDF, setIsLoadingPDF] = useState(false)
  const [page, setPage] = useState(0)
  const totalPages = 2

  const [changes, setChanges] = useState<ChangesState>({})

  const daysOfMonth = splitDaysOfMonthIntoTwoParts(Number(month), Number(year))

  function handleNextPage() {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
  }

  function handlePreviousPage() {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  function handleChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    employeeIndex: number,
    dayIndex: number,
  ) {
    const { value } = event.target
    const newStatus = value === 'T' ? 1 : 0

    const originalEmployee = scalesByMonthDate[page]?.[employeeIndex]
    if (!originalEmployee) return
    const originalDay = originalEmployee.days?.[dayIndex]
    if (!originalDay) return

    const originalAbsenceId = originalDay.absenceId ?? null
    const originalStatus = originalAbsenceId ? 0 : 1

    // --- deep clone do scalesByMonthDate ---
    const updatedScales = structuredClone
      ? structuredClone(scalesByMonthDate)
      : JSON.parse(JSON.stringify(scalesByMonthDate))

    const employeeToUpdate = updatedScales[page]?.[employeeIndex]
    const dayToUpdate = employeeToUpdate?.days?.[dayIndex]
    if (!dayToUpdate) return

    // --- atualiza status do dia alterado ---
    dayToUpdate.status = newStatus

    // --- recalcula activeDays de forma contínua para todo o mês ---
    // 1) pega todos os dias do funcionário em todas as páginas
    const allDays: EmployeeDay[] = updatedScales.flatMap(
      (pageArr: Employee[]) => pageArr[employeeIndex]?.days ?? [],
    )

    // 2) percorre todos os dias para recalcular activeDays
    let counter = 0
    allDays.forEach((day) => {
      if (!day) return

      if (Number(day.status) === 1) {
        counter++
        day.activeDays = counter
      } else {
        counter = 0
        day.activeDays = 0
      }
    })

    // 3) remapeia os dias de volta para cada página
    updatedScales.forEach((pageArr: Employee[]) => {
      if (!pageArr[employeeIndex]) return
      const len = pageArr[employeeIndex].days.length
      pageArr[employeeIndex].days = allDays.splice(0, len)
    })

    updateSetScalesByMonthDate(updatedScales)

    // --- decide ação (I = inserir folga, D = deletar folga) ---
    let actionType: 'I' | 'D' | null = null
    if (originalStatus === 1 && newStatus === 0) actionType = 'I'
    else if (originalStatus === 0 && newStatus === 1) actionType = 'D'

    const employeeId = String(employeeToUpdate.id)

    // índice global: evita sobrescrever quando muda de página
    const globalDayIndex =
      page === 0 ? dayIndex : dayIndex + daysOfMonth[0].length

    setChanges((prev) => {
      const newChanges: ChangesState = { ...prev }

      if (!newChanges[employeeId]) {
        newChanges[employeeId] = {
          name: formatName(employeeToUpdate.name) ?? '',
          days: {},
        }
      }

      if (newStatus === originalStatus) {
        // voltou pro estado original → remove do changes
        delete newChanges[employeeId].days[globalDayIndex]
        if (Object.keys(newChanges[employeeId].days).length === 0) {
          delete newChanges[employeeId]
        }
      } else if (actionType) {
        newChanges[employeeId].days[globalDayIndex] = {
          type: actionType,
          newStatus,
          absenceId: originalAbsenceId,
          date: dayToUpdate.date,
        }
      }

      return newChanges
    })
  }

  function dayOffValidator(): boolean {
    const nameEmployeesSet = new Set<string>()

    scalesByMonthDate.forEach((page) => {
      page.forEach((employee) => {
        employee.days.forEach((day) => {
          if (day?.activeDays !== undefined && day.activeDays > 6) {
            const name = formatName(employee.name)
            if (name) nameEmployeesSet.add(name)
          }
        })
      })
    })

    // transforma em array e ordena pelo nome
    const nameEmployees = Array.from(nameEmployeesSet).sort((a, b) =>
      a.localeCompare(b),
    )

    if (nameEmployees.length > 0) {
      setModalMessage(nameEmployees)
      setIsModalOpen(true)
      return true
    }

    return false
  }

  console.log('changes', changes)

  const handleSave = () => {
    setIsSubmitting(true)

    if (Object.keys(changes).length === 0) {
      toast.warning('Nenhuma alteração para salvar!', {
        style: { height: '50px', padding: '15px' },
      })
      setIsSubmitting(false)
      return true
    }

    const isInvalid = dayOffValidator()

    if (isInvalid) {
      setIsSubmitting(false)
      return
    }

    setTimeout(() => {
      updateScalesByMonthDate(changes)
      setChanges({})
      setIsSubmitting(false)
    }, 2000)
  }

  function handleGenerateScalePDF() {
    scalesByMonthDate.forEach((item) => {
      item.forEach((teste) => {
        formatName(teste.name)
      })
    })

    setIsLoadingPDF(true)

    setTimeout(async () => {
      const doc = (
        <ScaleByFortnightPDF
          scales={scalesByMonthDate}
          monthValue={monthValue}
          finishScale={dataFinishScale[0]?.finished}
        />
      )
      const asPdf = pdf()

      asPdf.updateContainer(doc)
      const blob = await asPdf.toBlob()

      const url = URL.createObjectURL(blob)
      window.open(url)

      setIsLoadingPDF(false)
    }, 2000)
  }

  const infoScaleMonthPeriod = useMemo(
    () => scalesByMonthDate.some((item) => item.length > 0),
    [scalesByMonthDate],
  )

  return (
    <Container>
      {isLoadingMonthScale ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          {!infoScaleMonthPeriod ? (
            <span>Não há informações no período</span>
          ) : (
            <>
              <PaginationByFortnight
                currentPage={page}
                totalPages={totalPages}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
              />

              <ContainerDayOffPdf onClick={handleGenerateScalePDF}>
                {!isLoadingPDF ? (
                  <CgPrinter size={24} />
                ) : (
                  <CircularProgress size={24} style={{ color: '#ffffff' }} />
                )}
              </ContainerDayOffPdf>

              <ContainerTable>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      {daysOfMonth[page]?.map((day) => (
                        <th key={day.dayAndmonth}>{day.dayAndmonth}</th>
                      ))}
                    </tr>
                    <tr>
                      <th>Colaboradores</th>
                      {daysOfMonth[page]?.map((day) => (
                        <th key={day.dayAndmonth}>{day.dayweek}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scalesByMonthDate[page]?.map((employee, employeeIndex) => (
                      <tr key={employee.id}>
                        <td>{formatName(employee.name)}</td>
                        {daysOfMonth[page]?.map((_, dayIndex) => {
                          const dayDataStatus = employee.days[dayIndex]?.status
                          const isVacationDay = dayDataStatus === null
                          const currentStatus = isVacationDay
                            ? undefined
                            : Number(dayDataStatus) === 0
                              ? 0
                              : 1

                          return (
                            <td key={dayIndex}>
                              <SelectStyled
                                status={currentStatus}
                                isVacation={isVacationDay}
                              >
                                {!isVacationDay && (
                                  <select
                                    value={currentStatus === 1 ? 'T' : 'F'}
                                    onChange={(event) =>
                                      handleChange(
                                        event,
                                        employeeIndex,
                                        dayIndex,
                                      )
                                    }
                                  >
                                    <option value="T">T</option>
                                    <option value="F">F</option>
                                  </select>
                                )}
                                <div className="styled-select">
                                  {isVacationDay ? (
                                    <span>Férias</span>
                                  ) : currentStatus === 0 ? (
                                    <span>Folga</span>
                                  ) : (
                                    <IoPersonCircleOutline size={20} />
                                  )}
                                </div>
                              </SelectStyled>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ContainerTable>
              <Footer>
                {(dataFinishScale[0]?.finished === false ||
                  dataFinishScale.length === 0) &&
                  cookieProfile === 'Gerente Loja' &&
                  month === currentMonth &&
                  year === currentYear && (
                    <Button
                      type="submit"
                      text="Salvar alterações"
                      color="#000"
                      bgColor="#7EC864"
                      width="200px"
                      onClick={handleSave}
                      isSubmitting={isSubmitting}
                    />
                  )}
              </Footer>
              <Modal
                message={modalMessage}
                open={isModalOpen}
                onHandleClose={() => setIsModalOpen(false)}
              />
            </>
          )}
        </>
      )}
    </Container>
  )
}
