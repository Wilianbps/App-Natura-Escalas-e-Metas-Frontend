import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

// 💡 Interfaces baseadas na sua estrutura IScaleSummary
interface DayData {
  date: string
  day: string
  month: string
  year: string
  turnId: number
  status: number // 1: Trabalha, 0: Folga
  startTime: string
  lunchTime: string
  endTime: string
  dayOfWeek: number // 1 a 7 (Segunda a Domingo)
  turn: string
}

interface IScaleSummary {
  id: string
  name: string
  dayOfWeek: number
  days: DayData[]
}

// O scaleSummary é um array de semanas, onde cada semana é um array de IScaleSummary
interface ScaleSummaryProps {
  scaleSummary: IScaleSummary[][]
  monthValue: string
}

// Interface para a informação de dia da semana (retorno de daysOfWeek)
interface WeekDayInfo {
  day: number
}

export async function generateScaleSummaryExcel(
  props: ScaleSummaryProps,
  weeksInfo: WeekDayInfo[][],
) {
  const { scaleSummary, monthValue } = props

  const workbook = new ExcelJS.Workbook()

  const DAYS_NAMES = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ]
  const TOTAL_WEEKS = scaleSummary.length

  // Loop para criar uma aba para cada semana
  for (let page = 0; page < TOTAL_WEEKS; page++) {
    const sheetTitle = `Semana ${page + 1}`
    const sheet = workbook.addWorksheet(sheetTitle)

    const collaborators = scaleSummary[page] || []
    const weekDays = weeksInfo[page] || []

    if (collaborators.length === 0) continue

    // ---------- HEADER: Dias da Semana e Datas ----------
    const headerRow = ['Nome Colab.']

    // Adiciona o dia da semana e a data
    weekDays.forEach((dayInfo, index) => {
      headerRow.push(`${DAYS_NAMES[index]} ${dayInfo.day}`)
    })

    sheet.addRow(headerRow)

    // Estiliza o cabeçalho
    const headerRowInstance = sheet.getRow(1)
    headerRowInstance.height = 25
    headerRowInstance.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE9C4' },
      }
      cell.font = { bold: true, color: { argb: '000000' } }
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
      }
    })

    // ---------- DADOS DO CORPO (UMA LINHA por Colaborador) ----------
    collaborators.forEach((collaborator) => {
      const dataRow: (string | null)[] = [collaborator.name]

      // Itera pelos 7 dias da semana
      Array.from({ length: 7 }).forEach((_, index) => {
        const day = collaborator.days.find((d) => d.dayOfWeek === index + 1)

        // Verifica se o dia pertence ao mês/semana e tem status
        if (!day || day.status === undefined || !day.month) {
          dataRow.push('')
          return
        }

        const statusChar = day.status === 1 ? 'T' : day.status === 0 ? 'F' : ''

        if (day.status === 1) {
          // Trabalha (T)
          // Formato: T (07:00 - 16:30)
          const timeAndStatus = `${statusChar} (${day.startTime} - ${day.endTime})`
          dataRow.push(timeAndStatus)
        } else if (day.status === 0) {
          // Folga (F)
          // Formato: F (FOLGA)
          dataRow.push(`${statusChar} (FOLGA)`)
        } else {
          dataRow.push('')
        }
      })

      // Adiciona a linha de dados
      const newRow = sheet.addRow(dataRow)

      // Estilização: Nome em negrito
      newRow.getCell(1).font = { bold: true }

      // Estilização: Centralizar Status/Horário
      for (let i = 2; i <= 8; i++) {
        newRow.getCell(i).alignment = {
          vertical: 'middle',
          horizontal: 'center',
        }
      }
    })

    // ---------- AJUSTE DE LARGURA ----------
    sheet.columns.forEach((col) => {
      if (!col) return
      const column = col as ExcelJS.Column
      let maxLength = 10

      column.eachCell({ includeEmpty: true }, (cell) => {
        const v = cell.value
        const text = v == null ? '' : String(v)
        const len = text.length
        if (len > maxLength) maxLength = len
      })

      // Coluna de nome (1) e colunas de dados (2+) fixas para Horário (15)
      column.width = Math.min(
        Math.max(maxLength + 2, column.number === 1 ? 25 : 15),
        50,
      )
    })
  }

  // ---------- EXPORTAR ----------
  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), `Resumo_Escalas_${monthValue}.xlsx`)
}
