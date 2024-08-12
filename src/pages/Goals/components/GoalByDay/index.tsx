import { CircularProgress } from '@mui/material'
import { pdf } from '@react-pdf/renderer'
import React, { useMemo, useState } from 'react'
import { CgPrinter } from 'react-icons/cg'

import { TextInfo } from '@/components/TextInfo'
import { useGoals } from '@/contexts/goals/GoalsContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'
import { formatNumber } from '@/libs/formatNumber'

import { GoalsSummaryPDF } from './components/GoalsSummaryPDF'
import { PaginationByFortnight } from './components/PaginationByFortnight'
import {
  Container,
  ContainerGoalsSummaryPdf,
  ContainerTable,
  Footer,
} from './styles'
import { splitDaysOfMonthIntoTwoParts } from './utils/splitDaysOfMonthIntoTwoParts'

export function GoalByDay() {
  const { monthValue } = useSettings()
  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]
  const { goals } = useGoals()

  const [isLoadingPDF, setIsLoadingPDF] = useState(false)

  const daysOfMonth = splitDaysOfMonthIntoTwoParts(Number(month), Number(year))

  const [page, setPage] = useState(0)

  const totalPages = 2

  function handleNextPage() {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
  }

  function handlePreviousPage() {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  const calculateDailyTotal = useMemo(
    () =>
      (dayIndex: number): React.ReactNode => {
        let total = 0
        goals[page]?.forEach((employee) => {
          const goalDayByEmployee = employee.days[dayIndex]?.goalDayByEmployee
          if (goalDayByEmployee !== '-') {
            total += Number(goalDayByEmployee)
          }
        })
        return total !== 0 ? formatNumber(total) : formatNumber(0)
      },
    [goals, page],
  )

  const calculateMonthTotal = useMemo(
    () =>
      (id: string): React.ReactNode => {
        let total = 0
        goals.forEach((employee) => {
          employee.forEach((item) => {
            item.days.forEach((day) => {
              const goalDayByEmployee = day.goalDayByEmployee
              if (goalDayByEmployee !== '-' && id === item.id) {
                total += Number(goalDayByEmployee)
              }
            })
          })
        })
        return formatNumber(total)
      },
    [goals],
  )

  function handleGenerateGoalSummaryPDF() {
    goals.forEach((item) => {
      item.forEach((teste) => {
        formatName(teste.name)
      })
    })

    setIsLoadingPDF(true)

    setTimeout(async () => {
      const doc = <GoalsSummaryPDF goals={goals} monthValue={monthValue} />
      const asPdf = pdf()

      asPdf.updateContainer(doc)
      const blob = await asPdf.toBlob()

      const url = URL.createObjectURL(blob)
      window.open(url)

      setIsLoadingPDF(false)
    }, 2000)
  }

  const hasExtraSeller = useMemo(() => {
    return goals[page]?.some((employee) => employee.activeSeller)
  }, [goals, page])

  return (
    <Container>
      {goals[0]?.length > 0 && (
        <PaginationByFortnight
          currentPage={page}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      )}

      <ContainerGoalsSummaryPdf onClick={handleGenerateGoalSummaryPDF}>
        {!isLoadingPDF ? (
          <CgPrinter size={24} />
        ) : (
          <CircularProgress size={24} style={{ color: '#ffffff' }} />
        )}
      </ContainerGoalsSummaryPdf>

      {goals[0]?.length === 0 && (
        <TextInfo text="Não há informações no período" marginTop="2rem" />
      )}
      {goals[0]?.length > 0 && (
        <>
          <ContainerTable>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  {daysOfMonth[page]?.map((day) => (
                    <th key={day.dayAndmonth}>{day.dayAndmonth}</th>
                  ))}
                </tr>
                <tr>
                  <th>Colaboladores</th>
                  <th>Total Mês</th>
                  {daysOfMonth[page]?.map((day) => (
                    <th key={day.dayAndmonth}>{day.dayweek}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {goals[page]?.map(
                  (employee) =>
                    !employee.activeSeller && (
                      <tr key={employee.id}>
                        <td>{formatName(employee.name)}</td>
                        <td>{calculateMonthTotal(employee.id)}</td>
                        {employee.days.map((day, index) => (
                          <td key={index}>
                            {!isNaN(Number(day.goalDayByEmployee))
                              ? formatNumber(Number(day.goalDayByEmployee))
                              : '-'}
                          </td>
                        ))}
                      </tr>
                    ),
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total diário loja</td>
                  <td></td>
                  {goals[page]
                    ?.slice(0, 1)
                    ?.map((employee) => (
                      <React.Fragment key={employee.id}>
                        {employee?.days
                          ?.slice(0, 16)
                          .map((_, indexDay) => (
                            <td key={employee.id + indexDay}>
                              {calculateDailyTotal(indexDay)}
                            </td>
                          ))}
                      </React.Fragment>
                    ))}
                </tr>
              </tfoot>
            </table>
          </ContainerTable>

          {hasExtraSeller && (
            <Footer>
              <h3>Colaborador Extra</h3>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    {daysOfMonth[page]?.map((day) => (
                      <th key={day.dayAndmonth}>{day.dayAndmonth}</th>
                    ))}
                  </tr>
                  <tr>
                    <th>Colaboladores</th>
                    <th>Total Mês</th>
                    {daysOfMonth[page]?.map((day) => (
                      <th key={day.dayAndmonth}>{day.dayweek}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {goals[page]?.map(
                    (employee) =>
                      employee.activeSeller && (
                        <tr key={employee.id}>
                          <td>{formatName(employee.name)}</td>
                          <td>{calculateMonthTotal(employee.id)}</td>
                          {employee.days.map((day, index) => (
                            <td key={index}>
                              {!isNaN(Number(day.goalDayByEmployee))
                                ? formatNumber(Number(day.goalDayByEmployee))
                                : '-'}
                            </td>
                          ))}
                        </tr>
                      ),
                  )}
                </tbody>
              </table>
            </Footer>
          )}
        </>
      )}
    </Container>
  )
}
