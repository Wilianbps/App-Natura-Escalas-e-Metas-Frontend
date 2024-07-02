import { Document, Page, Text, View } from '@react-pdf/renderer' // Componente do documento PDF

import { formatName } from '@/libs/formatName'

import { daysOfWeek } from '../../utils/daysOfWeek'
import { styles } from './styles'

interface IScaleSummary {
  id: string
  name: string
  dayOfWeek: number
  days: {
    date: string
    day: string
    month: string
    year: string
    turnId: number
    status: number
    startTime: string
    endTime: string
    dayOfWeek: number
    turn: string
  }[]
}

interface ScaleSummaryProps {
  scaleSummary: Array<IScaleSummary[]>
  monthValue: string
}

export function ScaleSummaryPDF(props: ScaleSummaryProps) {
  const { scaleSummary, monthValue } = props

  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  const weeks = daysOfWeek(Number(month), Number(year))

  const days = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ]

  function getShiftStyle(shift: string | undefined, value: string) {
    let style = {}
    if (shift === 'T1') style = value === 'T' ? styles.greenLight : styles.gray
    else if (shift === 'T2')
      style = value === 'T' ? styles.orangeDark : styles.gray
    else if (shift === 'T3') style = value === 'T' ? styles.brown : styles.gray
    else style = value === 'F' ? styles.gray : {}

    return style
  }
  return (
    <Document>
      {scaleSummary[0]?.length === 0 && (
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.header}>
            <Text>Não há Relatório no Período</Text>
          </View>
        </Page>
      )}

      {scaleSummary[0]?.length > 0 && (
        <>
          {weeks.map((week, pageIndex) => (
            <Page
              key={pageIndex}
              size="A4"
              orientation="landscape"
              style={styles.page}
            >
              <View style={styles.header}>
                <Text>
                  Resumo Escala {month}/{year} - Semana {pageIndex + 1}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeaderContainer}>
                  <Text>Nome Colab.</Text>
                </View>
                {week && (
                  <>
                    {days?.map((dayName, index) => (
                      <View key={index}>
                        <View style={styles.tableColHeaderContainer}>
                          <Text>{dayName}</Text>
                          <Text>
                            {week[index].day}/{week[index].month}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </>
                )}
              </View>

              {scaleSummary[pageIndex].map((collaborator, indexScale) => (
                <View style={styles.tableRow} key={indexScale}>
                  <View style={styles.tableColBodyContainer}>
                    <Text>{formatName(collaborator.name)}</Text>
                  </View>

                  {Array.from({ length: 7 }).map((_, index) => {
                    const day = collaborator.days.find(
                      (day) => day.dayOfWeek === index + 1,
                    )
                    return (
                      <View style={styles.tableColBodyContainer} key={index}>
                        <Text key={index}>
                          {day?.status === 1
                            ? `${day.startTime} - ${day.endTime}`
                            : ''}
                        </Text>

                        <View
                          key={index}
                          style={[
                            styles.tableCell,
                            getShiftStyle(
                              day?.turn,
                              day?.status === 1
                                ? 'T'
                                : day?.status === 0
                                  ? 'F'
                                  : '',
                            ),
                          ]}
                        >
                          {!day?.month ? (
                            <Text></Text>
                          ) : (
                            <Text>{day?.status === 1 ? 'T' : 'F'}</Text>
                          )}
                        </View>
                      </View>
                    )
                  })}
                </View>
              ))}
            </Page>
          ))}
        </>
      )}
    </Document>
  )
}
