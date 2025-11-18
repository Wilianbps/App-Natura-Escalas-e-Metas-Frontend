// ./components/GenerateGoalsByWeekExcel.ts (Corrigido para Metas Semanais)
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

// 💡 Interfaces baseadas no contexto do goalsByWeek
interface WeekData {
  amountWeek: number
}

interface EmployeeByWeek {
  id: string
  name: string
  totalAmountMonth: number // Total de todas as semanas
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
) {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('Metas Semanais')

  const employeeData = goalsByWeek.employeesByWeeks || []
  const weeksCount = goalsByWeek.weeksSums?.length || 0

  if (employeeData.length === 0) {
    console.warn('Nenhum dado de meta semanal encontrado para exportação.')
    return
  }

  // ---------- HEADER ----------
  // Criando os títulos das semanas (Semana 1, Semana 2, ...)
  const weekHeaders = Array.from({ length: weeksCount }).map(
    (_, index) => `Semana ${index + 1}`,
  )

  const header = ['Colaboradores', 'Total Mês', ...weekHeaders]
  sheet.addRow(header)

  // estiliza o cabeçalho (linha 1)
  const headerRow = sheet.getRow(1)
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
  const totalRow = [
    'Total semanal loja',
    '', // Célula vazia na coluna Total Mês
    ...(goalsByWeek.weeksSums || []), // Totais semanais
  ]
  const totalRowInstance = sheet.addRow(totalRow)
  totalRowInstance.font = { bold: true }

  // ---------- FORMATAÇÃO R$ E LARGURA ----------

  // 1. Coluna B (Total Mês)
  sheet.getColumn(2).numFmt = CURRENCY_FORMAT

  // 2. Colunas C em diante (Metas Semanais)
  // Começa na coluna 3 e vai até a última coluna (Colaborador + Total Mês + semanas)
  for (let i = 3; i <= header.length; i++) {
    sheet.getColumn(i).numFmt = CURRENCY_FORMAT
  }

  // AJUSTE DE LARGURA (auto width)
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
