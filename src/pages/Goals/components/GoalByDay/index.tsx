import React, { useMemo, useState } from 'react'

import { useGoals } from '@/contexts/goals/GoalsContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'
import { formatNumber } from '@/libs/formatNumber'

import { PaginationByFortnight } from './components/PaginationByFortnight'
import { Container, ContainerTable, Footer } from './styles'
import { splitDaysOfMonthIntoTwoParts } from './utils/splitDaysOfMonthIntoTwoParts'

export function GoalByDay() {
  const { monthValue } = useSettings()
  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]
  const { goals } = useGoals()

  const daysOfMonth = splitDaysOfMonthIntoTwoParts(Number(month), Number(year))

  const [page, setPage] = useState(0)

  const totalPages = 2

  function handleNextPage() {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
  }

  function handlePreviousPage() {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  /* function calculateDailyTotal(dayIndex: number): React.ReactNode {
    let total = 0
    goals[page]?.forEach((employee) => {
      const goalDayByEmployee = employee.days[dayIndex]?.goalDayByEmployee
      if (goalDayByEmployee !== '-') {
        total += Number(goalDayByEmployee)
      }
    })
    return total !== 0 ? formatNumber(total) : formatNumber(0)
  }

  function calculateMonthTotal(id: string): React.ReactNode {
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
  } */

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

  return (
    <Container>
      <PaginationByFortnight
        currentPage={page}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
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
            {goals[page]?.map((employee) => (
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
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total diário loja</td>
              <td></td>
              {goals[page]
                ?.map((employee) => (
                  <React.Fragment key={employee.id}>
                    {employee.days
                      .map((_, indexDay) => (
                        <td key={employee.id + indexDay}>
                          {calculateDailyTotal(indexDay)}
                        </td>
                      ))
                      .slice(0, 16)}
                  </React.Fragment>
                ))
                .slice(0, 1)}
            </tr>
          </tfoot>
        </table>
      </ContainerTable>

      <Footer>
        {/*  <p>Colaborador Extra</p>

        <table>
          <tbody>
            <tr>
              <td>Márcia Santos</td>
              <td>R$36.000,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
            </tr>
          </tbody>
        </table> */}
      </Footer>
    </Container>
  )
}
