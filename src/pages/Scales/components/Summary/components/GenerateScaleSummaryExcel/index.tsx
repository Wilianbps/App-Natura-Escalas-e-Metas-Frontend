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
  finishScale?: boolean | undefined
  storesByUser?: {
    branch: string
    profile: string
    status: boolean
    storeBranch: string
    storeCode: string
    user: string
  }[]
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

    // -------------------------------------------------
    // 🔵 LINHA EXTRA: LOJA + DATA/HORA + STATUS
    // -------------------------------------------------
    const storeName =
      props.storesByUser && props.storesByUser.length > 0
        ? props.storesByUser[0].branch.trim()
        : ''

    const now = new Date()
    const formattedDate =
      now.toLocaleDateString('pt-BR') +
      ' ' +
      now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

    const statusText = props.finishScale
      ? 'Escala Finalizada'
      : 'Escala Não Finalizada'

    const statusColor = props.finishScale ? 'FF3CB043' : 'FFFF0000' // verde/vermelho

    const extraRow = sheet.addRow([''])
    extraRow.height = 25
    extraRow.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' }

    extraRow.getCell(1).value = {
      richText: [
        {
          text: `${storeName} - ${formattedDate} - `,
          font: { bold: true, size: 14 },
        },
        {
          text: statusText,
          font: { bold: true, size: 14, color: { argb: statusColor } },
        },
      ],
    }

    sheet.mergeCells(
      `A${extraRow.number}:${sheet.getColumn(weekDays.length + 1).letter}${extraRow.number}`,
    )

    // -------------------------------------------------
    // HEADER ORIGINAL — NÃO ALTERADO
    // -------------------------------------------------
    const headerRow = ['Nome Colab.']

    weekDays.forEach((dayInfo, index) => {
      headerRow.push(`${DAYS_NAMES[index]} ${dayInfo.day}`)
    })

    sheet.addRow(headerRow)

    const headerRowInstance = sheet.getRow(extraRow.number + 1)
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

      Array.from({ length: 7 }).forEach((_, index) => {
        const day = collaborator.days.find((d) => d.dayOfWeek === index + 1)

        if (!day || day.status === undefined || !day.month) {
          dataRow.push('')
          return
        }

        const statusChar = day.status === 1 ? 'T' : day.status === 0 ? 'F' : ''

        if (day.status === 1) {
          dataRow.push(`${statusChar} (${day.startTime} - ${day.endTime})`)
        } else if (day.status === 0) {
          dataRow.push(`${statusChar} (FOLGA)`)
        } else {
          dataRow.push('')
        }
      })

      const newRow = sheet.addRow(dataRow)

      newRow.getCell(1).font = { bold: true }

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
