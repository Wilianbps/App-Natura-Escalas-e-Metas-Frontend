import { Document, Image, Page, Text, View } from '@react-pdf/renderer'

import { formatName } from '@/libs/formatName'

import logoDG from '../../../../../../../public/assets/consultdg_logo.png'
import logoNatura from '../../../../../../../public/assets/natura_logo.png'
import { splitDaysOfMonthIntoTwoParts } from '../../utils/splitDaysOfMonthIntoTwoParts'
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

export function ScaleSummaryByFortnightPDF(props: ScaleSummaryProps) {
  const { scaleSummary, monthValue } = props

  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  const fortnights = splitDaysOfMonthIntoTwoParts(Number(month), Number(year))

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
      {scaleSummary[0].length === 0 && (
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.logoHeader}>
            <Image source={logoNatura} style={styles.logoNatura} />
            <Image source={logoDG} style={styles.logoDG} />
          </View>
          <View style={styles.header}>
            <Text>Não há Relatório no Período</Text>
          </View>
        </Page>
      )}

      {scaleSummary[0].length > 0 && (
        <>
          {fortnights.map((fortnight, pageIndex) => (
            <Page
              size="A4"
              orientation="landscape"
              key={pageIndex}
              style={styles.page}
            >
              <View style={styles.logoHeader}>
                <Image source={logoNatura} style={styles.logoNatura} />
                <Image source={logoDG} style={styles.logoDG} />
              </View>
              <View style={styles.header}>
                <Text style={styles.textHeader}>
                  Resumo Escala {month}/{year} - Quinzena {pageIndex + 1}
                </Text>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableColHeaderContainer}>
                  <Text>Nome Colab.</Text>
                </View>
                {fortnight && (
                  <>
                    {fortnight?.map((day, index) => (
                      <View key={index}>
                        <View style={styles.tableColHeaderContainer}>
                          <Text>{day.dayweek}</Text>
                          <Text>
                            <Text>{day.dayAndmonth}</Text>
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

                  {fortnight.map((_, index) => (
                    <View style={styles.tableColBodyContainer} key={index}>
                      {/* Exibe o horário de início e término, se estiver disponível */}
                      <Text key={index}>
                        {collaborator.days[index]?.status === 1
                          ? `${collaborator.days[index].startTime} - ${collaborator.days[index].endTime}`
                          : ''}
                      </Text>

                      {/* Exibe o turno ou status */}
                      <View
                        key={index}
                        style={[
                          styles.tableCell,
                          getShiftStyle(
                            collaborator.days[index]?.turn,
                            collaborator.days[index]?.status === 1
                              ? 'T'
                              : collaborator.days[index]?.status === 0
                                ? 'F'
                                : '',
                          ),
                        ]}
                      >
                        <Text>
                          {collaborator.days[index]?.status === 1
                            ? 'T'
                            : collaborator.days[index]?.status === 0
                              ? 'F'
                              : ''}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </Page>
          ))}
        </>
      )}
    </Document>
  )
}
