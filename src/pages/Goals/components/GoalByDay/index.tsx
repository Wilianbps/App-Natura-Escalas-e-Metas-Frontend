import { CircularProgress } from '@mui/material'
import { pdf } from '@react-pdf/renderer'
import React, { useMemo, useState } from 'react'
import { CgPrinter } from 'react-icons/cg'
import { FaFileExcel } from 'react-icons/fa'

import { TextInfo } from '@/components/TextInfo'
import { useGoals } from '@/contexts/goals/GoalsContext'
import { useScales } from '@/contexts/scale/ScalesContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'
import { formatNumber } from '@/libs/formatNumber'

import { generateGoalsExcel } from './components/GenerateGoalsExcel'
import { GoalsSummaryPDF } from './components/GoalsSummaryPDF'
import { PaginationByFortnight } from './components/PaginationByFortnight'
import {
  Container,
  ContainerGoalsSummaryPdf,
  ContainerIcons,
  ContainerTable,
  Footer,
} from './styles'
import { splitDaysOfMonthIntoTwoParts } from './utils/splitDaysOfMonthIntoTwoParts'

export function GoalByDay() {
  const { monthValue } = useSettings()
  const { dataFinishScale } = useScales()
  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]
  const { goals } = useGoals()

  const [isLoadingPDF, setIsLoadingPDF] = useState(false)
  const [isLoadingExcel, setIsLoadingExcel] = useState(false)

  const daysOfMonth = splitDaysOfMonthIntoTwoParts(Number(month), Number(year))

  const [page, setPage] = useState(0)

  const totalPages = 2

  function handleNextPage() {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
  }

  function handlePreviousPage() {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  // CORRIGIDO: Tipo de retorno mudado para 'string' (resolve o erro de tipagem no JSX)
  const calculateDailyTotal = useMemo(
    () =>
      (dayIndex: number): string => {
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

  // CORRIGIDO: Tipo de retorno mudado para 'string' (resolve o erro de tipagem no JSX)
  const calculateMonthTotal = useMemo(
    () =>
      (id: string): string => {
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

  // FUNÇÃO DE CÁLCULO PARA EXCEL (Retorna 'number')
  function calculateMonthTotalExcel(id: string): number {
    let total = 0

    goals.forEach((employee) => {
      employee.forEach((item) => {
        item.days.forEach((day) => {
          const goal = day.goalDayByEmployee
          if (goal !== '-' && id === item.id) {
            total += Number(goal)
          }
        })
      })
    })

    return total
  }

  // FUNÇÃO DE CÁLCULO PARA EXCEL (Adicionado 'page' para uso interno na função Excel)
  function calculateDailyTotalExcel(dayIndex: number, page: number): number {
    let total = 0

    goals[page]?.forEach((employee) => {
      const goal = employee.days[dayIndex]?.goalDayByEmployee
      if (goal !== '-') {
        total += Number(goal)
      }
    })

    return total
  }

  // =====================
  // 📄 GERAR PDF
  // =====================
  function handleGenerateGoalSummaryPDF() {
    goals.forEach((item) => {
      item.forEach((teste) => {
        formatName(teste.name)
      })
    })

    setIsLoadingPDF(true)

    setTimeout(async () => {
      const doc = (
        <GoalsSummaryPDF
          goals={goals}
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

  // =====================
  // 🔰 EXPORTAR EXCEL — Mês inteiro
  // =====================
  function handleExportExcel() {
    setIsLoadingExcel(true)

    setTimeout(() => {
      generateGoalsExcel(
        goals,
        monthValue,
        daysOfMonth,
        // page REMOVIDO: a função Excel vai iterar as páginas internamente
        calculateMonthTotalExcel,
        // calculateDailyTotalExcel será chamada pela função Excel com o page correto
        calculateDailyTotalExcel,
      )

      setIsLoadingExcel(false)
    }, 800)
  }

  const hasExtraSeller = useMemo(() => {
    return goals[page]?.some((employee) => employee.activeSeller)
  }, [goals, page])

  return (
    <Container>
      {(goals[0]?.length || goals[1]?.length > 0) && (
        <PaginationByFortnight
          currentPage={page}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      )}
      <ContainerIcons>
        {/* PDF */}
        <ContainerGoalsSummaryPdf onClick={handleGenerateGoalSummaryPDF}>
          {!isLoadingPDF ? (
            <CgPrinter size={24} />
          ) : (
            <CircularProgress size={24} style={{ color: '#ffffff' }} />
          )}
        </ContainerGoalsSummaryPdf>

        {/* EXCEL */}
        <ContainerGoalsSummaryPdf onClick={handleExportExcel}>
          {!isLoadingExcel ? (
            <FaFileExcel size={24} />
          ) : (
            <CircularProgress size={24} style={{ color: '#ffffff' }} />
          )}
        </ContainerGoalsSummaryPdf>
      </ContainerIcons>

      {goals[page]?.length === 0 && (
        <TextInfo text="Não há informações no período" marginTop="2rem" />
      )}

      {goals[page]?.length > 0 && (
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
