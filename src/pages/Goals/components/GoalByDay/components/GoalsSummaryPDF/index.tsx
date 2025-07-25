import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { formatName } from '@/libs/formatName'
import { formatNumber } from '@/libs/formatNumber'

import logoDG from '../../../../../../../public/assets/consultdg_logo.png'
import logoNatura from '../../../../../../../public/assets/natura_logo.png'
import backgroundImage from '../../../../../../../public/assets/watermark_background.png'
import { splitDaysOfMonthIntoTwoParts } from '../../utils/splitDaysOfMonthIntoTwoParts'
import { styles } from './styles'

export interface IGoals {
  id: string
  name: string
  codeStore: string
  activeSeller: boolean
  days: {
    date: string
    goalDay: number | string
    goalDayByEmployee: number | string
  }[]
}

interface GoalsSummaryProps {
  goals: Array<IGoals[]>
  monthValue: string
  finishScale: boolean
}

export function GoalsSummaryPDF(props: GoalsSummaryProps) {
  const { goals, monthValue, finishScale } = props

  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]
  const now = new Date()
  const formattedDateTime = format(now, "dd/MM/yyyy 'às' HH:mm", {
    locale: ptBR,
  })

  const fortnights = splitDaysOfMonthIntoTwoParts(Number(month), Number(year))

  function calculateDailyTotal(
    dayIndex: number,
    page: number,
  ): React.ReactNode {
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
  }

  return (
    <Document>
      {goals[0].length === 0 && (
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

      {goals[0].length > 0 && (
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
                  Resumo Meta {month}/{year} - Quinzena {pageIndex + 1} - (Data
                  / Hora Impressão - {formattedDateTime})
                </Text>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableColLeftHeaderDayMonth}></View>
                <View style={styles.tableColLeftHeaderDayMonth}></View>
                {fortnight?.map((day, index) => (
                  <View key={index} style={styles.tableColHeaderDayMonth}>
                    <Text>{day.dayAndmonth}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableColLeftHeader}>
                  <Text>Colaboradores</Text>
                </View>
                <View style={styles.tableColLeftHeader}>
                  <Text>Total Mês</Text>
                </View>
                {fortnight?.map((day, index) => (
                  <View key={index} style={styles.tableColHeaderContainer}>
                    <Text>{day.dayweek}</Text>
                  </View>
                ))}
              </View>

              {goals[pageIndex]?.map((item, index) => (
                <View style={styles.tableRow} key={`${item.id}-${index}`}>
                  {!item.activeSeller && (
                    <>
                      <View
                        style={[
                          index % 2 === 0
                            ? styles.tableColLeftBody
                            : styles.tableColLeftBodyOdd,
                        ]}
                      >
                        <Text>{formatName(item?.name)}</Text>
                      </View>

                      <View
                        style={[
                          index % 2 === 0
                            ? styles.tableColLeftBody
                            : styles.tableColLeftBodyOdd,
                        ]}
                      >
                        <Text>{calculateMonthTotal(item.id)}</Text>
                      </View>
                      {item?.days?.map((day, indexDay) => (
                        <View
                          style={[
                            index % 2 === 0
                              ? styles.tableColBodyContainer
                              : styles.tableColBodyContainerOdd,
                          ]}
                          key={`${item.id}-${indexDay}`}
                        >
                          <Text>
                            {!isNaN(Number(day.goalDayByEmployee))
                              ? formatNumber(Number(day.goalDayByEmployee))
                              : '-'}
                          </Text>
                        </View>
                      ))}
                    </>
                  )}
                </View>
              ))}

              <View style={styles.tableRow}>
                <View style={styles.tableColLeftFooter}>
                  <Text>Total diário Loja</Text>
                </View>
                <View style={styles.tableColLeftFooter}>
                  <Text></Text>
                </View>
                {goals[pageIndex]?.slice(0, 1)?.map((employee) => (
                  <>
                    {employee?.days?.slice(0, 16).map((_, indexDay) => (
                      <View
                        style={styles.tableColFooterContainer}
                        key={indexDay}
                      >
                        <Text key={employee.id + indexDay}>
                          {calculateDailyTotal(indexDay, pageIndex)}
                        </Text>
                      </View>
                    ))}
                  </>
                ))}
              </View>

              {goals[pageIndex]?.some((item) => item.activeSeller) && (
                <>
                  <View style={styles.headerFootter}>
                    <Text style={styles.textHeader}>Colabolador Extra</Text>
                  </View>

                  {goals[pageIndex]?.map((item, index) => (
                    <View style={styles.tableRow} key={`${item.id}-${index}`}>
                      {item.activeSeller && (
                        <>
                          <View style={styles.tableColBodyBlue}>
                            <Text>{formatName(item?.name)}</Text>
                          </View>

                          <View style={styles.tableColBodyBlue}>
                            <Text>{calculateMonthTotal(item.id)}</Text>
                          </View>
                          {item?.days?.map((day, indexDay) => (
                            <View
                              style={styles.tableColBodyContainerBlue}
                              key={`${item.id}-${indexDay}`}
                            >
                              <Text>
                                {!isNaN(Number(day.goalDayByEmployee))
                                  ? formatNumber(Number(day.goalDayByEmployee))
                                  : '-'}
                              </Text>
                            </View>
                          ))}
                        </>
                      )}
                    </View>
                  ))}
                </>
              )}
              {(finishScale === false ||
                finishScale === undefined ||
                finishScale === null) && (
                <View style={styles.viewBackgroundImage}>
                  <Image
                    source={backgroundImage}
                    style={styles.backgroundImage}
                  />
                </View>
              )}
            </Page>
          ))}
        </>
      )}
    </Document>
  )
}
