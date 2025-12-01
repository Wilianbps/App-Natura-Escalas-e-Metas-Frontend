import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

interface GoalDay {
  goalDayByEmployee: string | number
}

interface Employee {
  id: string
  name: string
  days: GoalDay[]
  activeSeller: boolean
}

/**
 * Gera um XLSX com o mês completo em duas abas (quinzenas).
 */
export async function generateGoalsExcel(
  goals: Employee[][],
  monthValue: string,
  daysOfMonth: { dayAndmonth: string }[][],
  calculateMonthTotal: (id: string) => number | string,
  calculateDailyTotal: (index: number, page: number) => number | string,
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

  // Loop para criar 1ª e 2ª quinzena
  for (let page = 0; page < goals.length; page++) {
    const sheetTitle = page === 0 ? '1ª Quinzena' : '2ª Quinzena'
    const sheet = workbook.addWorksheet(sheetTitle)

    const calculateDailyTotalForPage = (index: number) =>
      calculateDailyTotal(index, page)

    const storeName =
      storesByUser && storesByUser.length > 0
        ? storesByUser[0].branch.trim()
        : ''

    const now = new Date()
    const formattedDate =
      now.toLocaleDateString('pt-BR') +
      ' ' +
      now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

    const statusText = finishScale
      ? 'Escala Finalizada'
      : 'Escala Não Finalizada'

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

    // Merge baseado no total de colunas do header
    const totalColumns = 2 + daysOfMonth[page].length
    sheet.mergeCells(
      `A${extraRow.number}:${sheet.getColumn(totalColumns).letter}${extraRow.number}`,
    )

    const header = [
      'Colaboradores',
      'Total Mês',
      ...daysOfMonth[page].map((d) => d.dayAndmonth),
    ]
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
    const employeesOnPage = goals[page] || []

    employeesOnPage
      .filter((e) => !e.activeSeller)
      .forEach((employee) => {
        const row = [
          employee.name,
          Number(calculateMonthTotal(employee.id)),
          ...employee.days.map((d) =>
            !isNaN(Number(d.goalDayByEmployee))
              ? Number(d.goalDayByEmployee)
              : '-',
          ),
        ]
        sheet.addRow(row)
      })

    // ---------- TOTAL DIÁRIO ----------
    const dailyRow = [
      'Total diário loja',
      '',
      ...daysOfMonth[page].map((_, i) => Number(calculateDailyTotalForPage(i))),
    ]
    const dailyTotalRow = sheet.addRow(dailyRow)
    dailyTotalRow.font = { bold: true }

    sheet.addRow([])

    // ---------- VENDEDORES EXTRAS ----------
    const extraSellers = employeesOnPage.filter((e) => e.activeSeller)
    if (extraSellers.length > 0) {
      sheet.addRow(['Colaborador Extra']).font = { bold: true }

      sheet.addRow(header).font = {
        bold: true,
        color: { argb: '000000' },
      }

      extraSellers.forEach((employee) => {
        const row = [
          employee.name,
          Number(calculateMonthTotal(employee.id)),
          ...employee.days.map((d) =>
            !isNaN(Number(d.goalDayByEmployee))
              ? Number(d.goalDayByEmployee)
              : '-',
          ),
        ]
        sheet.addRow(row)
      })
    }

    // ---------- FORMATO R$ ----------
    const CURRENCY_FORMAT = 'R$ #,##0.00'
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
  }

  // ---------- EXPORTAR ----------
  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), `Metas_Mensal_${monthValue}.xlsx`)
}
