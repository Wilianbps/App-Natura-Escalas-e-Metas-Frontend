import { CircularProgress } from '@mui/material'
import { pdf } from '@react-pdf/renderer'
import { useState } from 'react'
import { CgPrinter } from 'react-icons/cg'

import { useScales } from '@/contexts/scale/ScalesContext'
import { formatName } from '@/libs/formatName'

import { PaginationByWeek } from './components/PaginationByWeek'
import { ScaleSummaryPDF } from './components/ScaleSummaryPDF'
import {
  Container,
  ContainerScaleSummaryPdf,
  ContainerTable,
  TDShift,
  TRShiftMorning,
} from './styles'
import { daysOfWeek } from './utils/daysOfWeek'

export function Summary() {
  const { scaleSummary } = useScales()

  const [isLoadingPDF, setIsLoadingPDF] = useState(false)

  const [page, setPage] = useState(0)

  const week = daysOfWeek(6, 2024)

  const totalPages = week.length

  function handleNextPage() {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
  }

  function handlePreviousPage() {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  function handleGenerateScaleSummaryPDF() {
    setIsLoadingPDF(true)

    setTimeout(async () => {
      const doc = <ScaleSummaryPDF scaleSummary={scaleSummary} />

      const asPdf = pdf()

      asPdf.updateContainer(doc)
      const blob = await asPdf.toBlob()

      const url = URL.createObjectURL(blob)
      window.open(url)

      setIsLoadingPDF(false)
    }, 2000)
  }

  const days = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ]

  return (
    <Container>
      <PaginationByWeek
        currentPage={page}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
      <ContainerScaleSummaryPdf onClick={handleGenerateScaleSummaryPDF}>
        <section>
          {!isLoadingPDF ? (
            <CgPrinter size={24} />
          ) : (
            <CircularProgress size={24} style={{ color: '#ffffff' }} />
          )}
        </section>
      </ContainerScaleSummaryPdf>
      <ContainerTable>
        <table>
          <thead>
            <tr>
              <th>Nome Colab.</th>
              <th>HT-M</th>
              <th>DT</th>

              {/* Renderiza os dias da semana uma vez */}
              {week[page] && (
                <>
                  {days?.map((dayName, index) => (
                    <th key={index}>
                      <p>{dayName}</p>
                      <p>{week[page][index].day}</p>
                    </th>
                  ))}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {scaleSummary[page]?.map((collaborator) => (
              <>
                <TRShiftMorning>
                  <td rowSpan={2} className="td-name">
                    {formatName(collaborator.name)}
                  </td>
                  <td rowSpan={2}>27</td>
                  <td rowSpan={2}></td>

                  {Array.from({ length: 7 }).map((_, index) => {
                    const day = collaborator.days.find(
                      (day) => day.dayOfWeek === index + 1,
                    )
                    return (
                      <td key={index} width={140}>
                        {day?.status === 1
                          ? `${day.startTime} - ${day.endTime}`
                          : ''}
                      </td>
                    )
                  })}
                </TRShiftMorning>
                <TRShiftMorning>
                  {Array.from({ length: 7 }).map((_, index) => {
                    const day = collaborator.days.find(
                      (day) => day.dayOfWeek === index + 1,
                    )
                    return (
                      <TDShift
                        key={index}
                        value={
                          day?.status === 1 ? 'T' : day?.status === 0 ? 'F' : ''
                        }
                        shift={day?.status === 1 ? day.turn : ''}
                      >
                        {!day?.month ? (
                          <div></div>
                        ) : (
                          <div>{day?.status === 1 ? 'T' : 'F'}</div>
                        )}
                      </TDShift>
                    )
                  })}
                </TRShiftMorning>
              </>
            ))}
          </tbody>
        </table>
      </ContainerTable>
    </Container>
  )
}
