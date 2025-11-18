// GoalByWeek.tsx (Versão modificada e completa)
import { CircularProgress } from '@mui/material'
import { pdf } from '@react-pdf/renderer'
import { useState } from 'react'
import { CgPrinter } from 'react-icons/cg'
import { FaFileExcel } from 'react-icons/fa' // 💡 Importar ícone do Excel

import { TextInfo } from '@/components/TextInfo'
import { useGoals } from '@/contexts/goals/GoalsContext'
import { useScales } from '@/contexts/scale/ScalesContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'
import { formatNumber } from '@/libs/formatNumber'

import { generateGoalsByWeekExcel } from './components/generateGoalsByWeekExcel'
import { GoalsByWeekPDF } from './components/GoalsSummaryPDF'
import {
  Container,
  ContainerGoalsByWeekPdf,
  ContainerIcons,
  ContainerTable,
  MessageText,
} from './styles'

export function GoalByWeek() {
  const { goalsByWeek } = useGoals()
  const { dataFinishScale } = useScales()
  const [isLoadingPDF, setIsLoadingPDF] = useState(false)
  const [isLoadingExcel, setIsLoadingExcel] = useState(false) // 💡 Estado para o Excel
  const { monthValue } = useSettings()

  const finishScale = dataFinishScale[0]?.finished

  function handleGenerateGoalByWeekPDF() {
    setIsLoadingPDF(true)

    setTimeout(async () => {
      const doc = (
        <GoalsByWeekPDF
          goalsByWeek={goalsByWeek}
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

  // 💡 NOVA FUNÇÃO: EXPORTAR EXCEL
  function handleExportExcel() {
    setIsLoadingExcel(true)

    setTimeout(() => {
      generateGoalsByWeekExcel(goalsByWeek, monthValue)

      setIsLoadingExcel(false)
    }, 800)
  }
  // ------------------------------------

  return (
    <Container>
      <ContainerTable>
        {(finishScale === false ||
          finishScale === undefined ||
          finishScale === null) &&
        goalsByWeek.employeesByWeeks?.length ? (
          <MessageText>Escala Não Finalizada</MessageText>
        ) : (
          ''
        )}
        <ContainerIcons>
          {/* BOTÃO PDF */}
          <ContainerGoalsByWeekPdf onClick={handleGenerateGoalByWeekPDF}>
            {!isLoadingPDF ? (
              <CgPrinter size={24} />
            ) : (
              <CircularProgress size={24} style={{ color: '#ffffff' }} />
            )}
          </ContainerGoalsByWeekPdf>

          {/* 💡 NOVO BOTÃO EXCEL */}
          <ContainerGoalsByWeekPdf onClick={handleExportExcel}>
            {!isLoadingExcel ? (
              <FaFileExcel size={24} />
            ) : (
              <CircularProgress size={24} style={{ color: '#ffffff' }} />
            )}
          </ContainerGoalsByWeekPdf>

          {goalsByWeek.employeesByWeeks?.length === 0 && (
            <TextInfo text="Não há informações no período" marginTop="2rem" />
          )}
        </ContainerIcons>

        {goalsByWeek.employeesByWeeks?.length > 0 && (
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
                {Array.from({ length: goalsByWeek?.weeksSums?.length }).map(
                  (_, index) => (
                    <th key={index}></th>
                  ),
                )}
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
    </Container>
  )
}
