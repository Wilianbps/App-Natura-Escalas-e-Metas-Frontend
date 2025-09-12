import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { formatName } from '@/libs/formatName'

import logoDG from '../../../../../../../public/assets/consultdg_logo.png'
import logoNatura from '../../../../../../../public/assets/natura_logo.png'
import personIcon from '../../../../../../../public/assets/person.png'
import backgroundImage from '../../../../../../../public/assets/watermark_background.png'
import { splitDaysOfMonthIntoTwoParts } from '../../utils/splitDaysOfMonthIntoTwoParts'
import { styles } from './styles'

export interface IScaleByMonthDate {
  id: string
  name: string
  days: {
    date: string
    status: number | null // 1 = Trabalho, 0 = Folga, null = Férias
    absenceId: number | null
  }[]
}

interface ScalesProps {
  scales: Array<IScaleByMonthDate[]>
  monthValue: string
  finishScale: boolean
}

export function ScaleByFortnightPDF({
  scales,
  monthValue,
  finishScale,
}: ScalesProps) {
  const [year, month] = monthValue.split('-')
  const now = new Date()
  const formattedDateTime = format(now, "dd/MM/yyyy 'às' HH:mm", {
    locale: ptBR,
  })

  const fortnights = splitDaysOfMonthIntoTwoParts(Number(month), Number(year))

  // Função para renderizar cada célula conforme status
  function renderDayCell(status: number | null) {
    if (status === null) {
      return <Text style={{ color: '#449428', fontSize: 8 }}>Férias</Text>
    }
    if (status === 0) {
      return <Text style={{ color: '#FF9E00', fontSize: 8 }}>Folga</Text>
    }
    return <Image src={personIcon} style={{ width: 12, height: 12 }} />
  }

  return (
    <Document>
      {scales[0]?.length === 0 && (
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

      {scales[0]?.length > 0 && (
        <>
          {fortnights.map((fortnight, pageIndex) => (
            <Page
              size="A4"
              orientation="landscape"
              key={`page-${pageIndex}`}
              style={styles.page}
            >
              {/* Cabeçalho com logos */}
              <View style={styles.logoHeader}>
                <Image source={logoNatura} style={styles.logoNatura} />
                <Image source={logoDG} style={styles.logoDG} />
              </View>

              <View style={styles.header}>
                <Text style={styles.textHeader}>
                  Escala de Trabalho {month}/{year} - Quinzena {pageIndex + 1} -
                  (Impresso em {formattedDateTime})
                </Text>
              </View>

              {/* Linha com dia/mês */}
              <View style={styles.tableRow}>
                <View style={styles.tableColLeftHeaderDayMonth}></View>
                {fortnight.map((day, index) => (
                  <View
                    key={`day-month-${index}`}
                    style={styles.tableColHeaderDayMonth}
                  >
                    <Text>{day.dayAndmonth}</Text>
                  </View>
                ))}
              </View>

              {/* Linha com dia da semana */}
              <View style={styles.tableRow}>
                <View style={styles.tableColLeftHeader}>
                  <Text>Colaboradores</Text>
                </View>
                {fortnight.map((day, index) => (
                  <View
                    key={`day-week-${index}`}
                    style={styles.tableColHeaderContainer}
                  >
                    <Text>{day.dayweek}</Text>
                  </View>
                ))}
              </View>

              {/* Linhas dos colaboradores */}
              {scales[pageIndex]?.map((item, index) => (
                <View style={styles.tableRow} key={`${item.id}-${index}`}>
                  <View
                    style={[
                      index % 2 === 0
                        ? styles.tableColLeftBody
                        : styles.tableColLeftBodyOdd,
                    ]}
                  >
                    <Text>{formatName(item.name)}</Text>
                  </View>

                  {item.days.map((day, indexDay) => (
                    <View
                      key={`${item.id}-day-${indexDay}`}
                      style={[
                        index % 2 === 0
                          ? styles.tableColBodyContainer
                          : styles.tableColBodyContainerOdd,
                        { justifyContent: 'center', alignItems: 'center' },
                      ]}
                    >
                      {renderDayCell(day.status)}
                    </View>
                  ))}
                </View>
              ))}

              {/* Marca d'água se a escala não estiver finalizada */}
              {!finishScale && (
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
