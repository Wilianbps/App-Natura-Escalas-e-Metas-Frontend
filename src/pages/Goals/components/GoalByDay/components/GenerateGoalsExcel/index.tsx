// utils/generateGoalsExcel.ts
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

interface GoalDay {
  goalDayByEmployee: string | number
}

interface Employee {
  id: string
  name: string
  days: GoalDay[]
  activeSeller: boolean // Adicionado para garantir o contexto
}

/**
 * Gera um XLSX com o mês completo em duas abas (quinzenas).
 */
export async function generateGoalsExcel(
  goals: Employee[][],
  monthValue: string,
  daysOfMonth: { dayAndmonth: string }[][],
  // page REMOVIDO daqui
  calculateMonthTotal: (id: string) => number | string,
  // page ADICIONADO como parâmetro da função de cálculo diário
  calculateDailyTotal: (index: number, page: number) => number | string,
) {
  const workbook = new ExcelJS.Workbook()

  // 💡 Loop para criar DUAS ABAS (1ª Quinzena e 2ª Quinzena)
  for (let page = 0; page < goals.length; page++) {
    const sheetTitle = page === 0 ? '1ª Quinzena' : '2ª Quinzena'
    const sheet = workbook.addWorksheet(sheetTitle)

    // Função auxiliar para calcular o total diário específico desta página/aba
    const calculateDailyTotalForPage = (index: number) =>
      calculateDailyTotal(index, page)

    // ---------- HEADER ----------
    const header = [
      'Colaboradores',
      'Total Mês',
      ...daysOfMonth[page].map((d) => d.dayAndmonth),
    ]
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

    // ---------- DADOS DOS COLABORADORES (Vendedores Ativos e Extras) ----------
    const employeesOnPage = goals[page] || []

    // Filtra e Adiciona Vendedores Normais
    employeesOnPage
      .filter((e) => !e.activeSeller)
      .forEach((employee) => {
        const row = [
          employee.name,
          // Garante que o valor passado é numérico
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
      // Garante que o valor passado é numérico
      ...daysOfMonth[page].map((_, i) => Number(calculateDailyTotalForPage(i))),
    ]
    const dailyTotalRow = sheet.addRow(dailyRow)
    dailyTotalRow.font = { bold: true }

    // Adiciona uma linha em branco para separar
    sheet.addRow([])

    // ---------- VENDEDORES EXTRAS (Opcional, se o formato for usado) ----------
    const extraSellers = employeesOnPage.filter((e) => e.activeSeller)
    if (extraSellers.length > 0) {
      sheet.addRow(['Colaborador Extra']).font = { bold: true }

      // Adiciona um cabeçalho auxiliar
      sheet.addRow(header).font = { bold: true, color: { argb: '000000' } }

      extraSellers.forEach((employee) => {
        const row = [
          employee.name,
          // Garante que o valor passado é numérico
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

    // ⭐️ INÍCIO: APLICAÇÃO DA FORMATAÇÃO R$
    const CURRENCY_FORMAT = 'R$ #,##0.00'

    // Coluna 2 (Total Mês)
    sheet.getColumn(2).numFmt = CURRENCY_FORMAT

    // Colunas 3 em diante (Metas Diárias)
    for (let i = 3; i <= header.length; i++) {
      sheet.getColumn(i).numFmt = CURRENCY_FORMAT
    }
    // ⭐️ FIM: APLICAÇÃO DA FORMATAÇÃO R$

    // ---------- AJUSTE DE LARGURA (auto width) ----------
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
      // Ajustado o valor mínimo para 12 para acomodar o formato R$ #,##0.00
      column.width = Math.min(Math.max(maxLength + 2, 12), 50)
    })
  } // FIM DO LOOP das quinzenas

  // ---------- EXPORTAR ----------
  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), `Metas_Mensal_${monthValue}.xlsx`)
}
