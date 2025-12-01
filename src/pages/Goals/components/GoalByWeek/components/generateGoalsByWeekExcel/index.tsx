import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

interface WeekData {
  amountWeek: number
}

interface EmployeeByWeek {
  id: string
  name: string
  totalAmountMonth: number
  weeks: WeekData[]
}

interface GoalsByWeekData {
  employeesByWeeks: EmployeeByWeek[]
  weeksSums: number[] // Total semanal loja
}

const CURRENCY_FORMAT = 'R$ #,##0.00'

export async function generateGoalsByWeekExcel(
  goalsByWeek: GoalsByWeekData,
  monthValue: string,
  finishScale?: boolean | undefined,
  storesByUser?: {
    branch: string
    profile: string
    status: boolean
    storeBranch: string
    storeCode: string
    user: string
  }[],
) {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('Metas Semanais')

  const employeeData = goalsByWeek.employeesByWeeks || []
  const weeksCount = goalsByWeek.weeksSums?.length || 0

  if (employeeData.length === 0) {
    console.warn('Nenhum dado de meta semanal encontrado para exportação.')
    return
  }

  const storeName =
    storesByUser && storesByUser.length > 0 ? storesByUser[0].branch.trim() : ''

  const now = new Date()
  const formattedDate =
    now.toLocaleDateString('pt-BR') +
    ' ' +
    now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  const statusText = finishScale ? 'Escala Finalizada' : 'Escala Não Finalizada'

  const statusColor = finishScale ? 'FF3CB043' : 'FFFF0000'

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

  // Merge baseado no total de colunas existentes (Colab + Total Mês + semanas)
  const totalColumns = 2 + weeksCount
  sheet.mergeCells(
    `A${extraRow.number}:${sheet.getColumn(totalColumns).letter}${extraRow.number}`,
  )

  const weekHeaders = Array.from({ length: weeksCount }).map(
    (_, index) => `Semana ${index + 1}`,
  )

  const header = ['Colaboradores', 'Total Mês', ...weekHeaders]
  sheet.addRow(header)

  const headerRow = sheet.getRow(extraRow.number + 1)
  headerRow.height = 20
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE9C4' },
    }
    cell.font = { bold: true, color: { argb: '000000' } }
    cell.alignment = { vertical: 'middle', horizontal: 'center' }
  })

  // ---------- DADOS DOS COLABORADORES ----------
  employeeData.forEach((item) => {
    const row = [
      item.name,
      item.totalAmountMonth,
      ...item.weeks.map((week) => week?.amountWeek || 0),
    ]
    sheet.addRow(row)
  })

  // ---------- TOTAL SEMANAL LOJA ----------
  const totalRow = ['Total semanal loja', '', ...(goalsByWeek.weeksSums || [])]
  const totalRowInstance = sheet.addRow(totalRow)
  totalRowInstance.font = { bold: true }

  // ---------- FORMATAÇÃO R$ E LARGURA ----------
  sheet.getColumn(2).numFmt = CURRENCY_FORMAT

  for (let i = 3; i <= header.length; i++) {
    sheet.getColumn(i).numFmt = CURRENCY_FORMAT
  }

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

    column.width = Math.min(Math.max(maxLength + 2, 12), 50)
  })

  // ---------- EXPORTAR ----------
  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), `Metas_Semanais_${monthValue}.xlsx`)
}
