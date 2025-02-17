import { CircularProgress } from '@mui/material'
import { pdf } from '@react-pdf/renderer'
import React, { useMemo, useState } from 'react'
import { CgPrinter } from 'react-icons/cg'

import { TextInfo } from '@/components/TextInfo'
import { useScales } from '@/contexts/scale/ScalesContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'

import { PaginationByWeek } from './components/PaginationByWeek'
import { ScaleSummaryByFortnightPDF } from './components/ScaleSummaryByFortnightPDF'
import {
  Container,
  ContainerScaleSummaryPdf,
  ContainerTable,
  TDShift,
  TRShiftMorning,
} from './styles'
import { daysOfWeek } from './utils/daysOfWeek'

export function Summary() {
  const { monthValue } = useSettings()
  const { scaleSummary, scaleSummaryByFortnight } = useScales()

  const infoScalePeriod = useMemo(() => {
    return scaleSummary.some((item) => item.length > 0)
  }, [scaleSummary])

  const month = monthValue && monthValue.split('-')[1]

  const year = monthValue.split('-')[0]

  const [isLoadingPDF, setIsLoadingPDF] = useState(false)

  const [page, setPage] = useState(0)

  const week = daysOfWeek(Number(month), Number(year))

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
      const doc = (
        <ScaleSummaryByFortnightPDF
          scaleSummary={scaleSummaryByFortnight}
          monthValue={monthValue}
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
      {!infoScalePeriod && (
        <TextInfo text="Não há informações no período" marginTop="2rem" />
      )}

      {infoScalePeriod && (
        <>
          {scaleSummary[0]?.length > 0 && (
            <PaginationByWeek
              currentPage={page}
              totalPages={totalPages}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            />
          )}

          <ContainerScaleSummaryPdf onClick={handleGenerateScaleSummaryPDF}>
            {!isLoadingPDF ? (
              <CgPrinter size={24} />
            ) : (
              <CircularProgress size={24} style={{ color: '#ffffff' }} />
            )}
          </ContainerScaleSummaryPdf>
          <ContainerTable>
            {scaleSummary[0]?.length === 0 && (
              <TextInfo text="Não há informações no período" marginTop="2rem" />
            )}

            {scaleSummary[0]?.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Nome Colab.</th>
                    {week[page] && (
                      <>
                        {days?.map((dayName, index) => (
                          <th key={`day-${index}`}>
                            <p>{dayName}</p>
                            <p>{week[page][index].day}</p>
                          </th>
                        ))}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {scaleSummary[page]?.map((collaborator, collIndex) => (
                    <React.Fragment key={`coll-${collIndex}`}>
                      <TRShiftMorning>
                        <td rowSpan={2} className="td-name">
                          {formatName(collaborator.name)}
                        </td>

                        {Array.from({ length: 7 }).map((_, index) => {
                          const day = collaborator.days.find(
                            (day) => day.dayOfWeek === index + 1,
                          )
                          return (
                            <td key={`shift-${collIndex}-${index}`} width={140}>
                              {day?.status === 1
                                ? `${day.startTime} - ${day.lunchTime} - ${day.endTime}`
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
                              key={`td-shift-${collIndex}-${index}`}
                              value={
                                day?.status === 1
                                  ? 'T'
                                  : day?.status === 0
                                    ? 'F'
                                    : ''
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
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </ContainerTable>
        </>
      )}
    </Container>
  )
}
