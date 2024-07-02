import { CircularProgress } from '@mui/material'
import { pdf } from '@react-pdf/renderer'
import { useState } from 'react'
import { CgPrinter } from 'react-icons/cg'

import { TextInfo } from '@/components/TextInfo'
import { useGoals } from '@/contexts/goals/GoalsContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'
import { formatNumber } from '@/libs/formatNumber'

import { GoalsByWeekPDF } from '../GoalByDay/components/GoalsSummaryPDF copy'
import {
  Container,
  ContainerGoalsByWeekPdf,
  ContainerTable,
  Footer,
} from './styles'

export function GoalByWeek() {
  const { goalsByWeek } = useGoals()
  const [isLoadingPDF, setIsLoadingPDF] = useState(false)
  const { monthValue } = useSettings()

  function handleGenerateGoalByWeekPDF() {
    setIsLoadingPDF(true)

    setTimeout(async () => {
      const doc = (
        <GoalsByWeekPDF goalsByWeek={goalsByWeek} monthValue={monthValue} />
      )
      const asPdf = pdf()

      asPdf.updateContainer(doc)
      const blob = await asPdf.toBlob()

      const url = URL.createObjectURL(blob)
      window.open(url)

      setIsLoadingPDF(false)
    }, 2000)
  }

  return (
    <Container>
      <ContainerTable>
        <ContainerGoalsByWeekPdf onClick={handleGenerateGoalByWeekPDF}>
          {!isLoadingPDF ? (
            <CgPrinter size={24} />
          ) : (
            <CircularProgress size={24} style={{ color: '#ffffff' }} />
          )}
        </ContainerGoalsByWeekPdf>

        {goalsByWeek.employeesByWeeks.length === 0 && (
          <TextInfo text="Não há informações no período" marginTop="2rem" />
        )}

        {goalsByWeek.employeesByWeeks.length > 0 && (
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                {Array.from({ length: goalsByWeek?.weeksSums?.length }).map(
                  (_, index) => (
                    <th key={index}>Semana {index + 1}</th>
                  ),
                )}
              </tr>
              <tr>
                <th>Colaboladores</th>
                <th>Total Mês</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {goalsByWeek?.employeesByWeeks?.map((item) => (
                <tr key={item.id}>
                  <td>{formatName(item.name)}</td>
                  <td>{formatNumber(item.totalAmountMonth)}</td>
                  {item.weeks.map((week, index) => (
                    <td key={item.id + index}>
                      {formatNumber(week?.amountWeek)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total semanal loja</td>
                <td></td>

                {goalsByWeek?.weeksSums?.map((value, index) => (
                  <td key={value + index}>{formatNumber(value)}</td>
                ))}
              </tr>
            </tfoot>
          </table>
        )}
      </ContainerTable>

      <Footer>
        {/*      <p>Colaborador Extra</p>

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
            </tr>
          </tbody>
        </table> */}
      </Footer>
    </Container>
  )
}
