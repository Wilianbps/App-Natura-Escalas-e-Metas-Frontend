import { Document, Image, Page, Text, View } from '@react-pdf/renderer' // Componente do documento PDF

import { formatName } from '@/libs/formatName'
import { formatNumber } from '@/libs/formatNumber'

import logoDG from '../../../../../../../public/assets/consultdg_logo.png'
import logoNatura from '../../../../../../../public/assets/natura_logo.png'
import { styles } from './styles'

interface IGoalsByWeek {
  employeesByWeeks: {
    id: string
    name: string
    codeStore: string
    totalAmountMonth: number
    weeks: {
      days: {
        id: string
        codeStore: string
        name: string
        date: string
        goalDay: number | string
        goalDayByEmployee: number | string
      }
      amountWeek: number
    }[]
  }[]
  weeksSums: number[]
}

interface GoalsSummaryProps {
  goalsByWeek: IGoalsByWeek
  monthValue: string
}

export function GoalsByWeekPDF(props: GoalsSummaryProps) {
  const { goalsByWeek, monthValue } = props

  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  return (
    <Document>
      {goalsByWeek.employeesByWeeks.length === 0 && (
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

      {goalsByWeek.employeesByWeeks.length > 0 && (
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.logoHeader}>
            <Image source={logoNatura} style={styles.logoNatura} />
            <Image source={logoDG} style={styles.logoDG} />
          </View>
          <View style={styles.header}>
            <Text style={styles.textHeader}>
              Resumo Meta Por Semana {month}/{year}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeaderWeek}></View>
            <View style={styles.tableColHeaderWeek}></View>
            {Array.from({ length: goalsByWeek.weeksSums.length }).map(
              (_, index) => (
                <View key={index} style={styles.tableColHeaderWeek}>
                  <Text>Semana {index + 1}</Text>
                </View>
              ),
            )}
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColLeftHeader}>
              <Text>Colaboradores</Text>
            </View>
            <View style={styles.tableColLeftHeader}>
              <Text>Total Mês</Text>
            </View>
            {Array.from({ length: goalsByWeek.weeksSums.length }).map(
              (_, index) => (
                <View key={index} style={styles.tableColHeaderContainer}>
                  <Text></Text>
                </View>
              ),
            )}
          </View>

          {goalsByWeek?.employeesByWeeks?.map((item, index) => (
            <View style={styles.tableRow} key={item.id}>
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
                <Text>{formatNumber(item.totalAmountMonth)}</Text>
              </View>
              {item.weeks.map((week, indexWeek) => (
                <View
                  key={item.id + indexWeek}
                  style={[
                    index % 2 === 0
                      ? styles.tableColLeftBody
                      : styles.tableColLeftBodyOdd,
                  ]}
                >
                  <Text>{formatNumber(week?.amountWeek)}</Text>
                </View>
              ))}
            </View>
          ))}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeaderContainer}>
              <Text>Total semanal loja</Text>
            </View>
            <View style={styles.tableColHeaderContainer}>
              <Text></Text>
            </View>
            {goalsByWeek?.weeksSums?.map((value, index) => (
              <View key={value + index} style={styles.tableColHeaderContainer}>
                <Text> {formatNumber(value)}</Text>
              </View>
            ))}
          </View>
        </Page>
      )}
    </Document>
  )
}
