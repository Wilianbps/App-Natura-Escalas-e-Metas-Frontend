import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

interface EmployeeDay {
  status: number | null // 1: Trabalha, 0: Folga
  activeDays?: number
  absenceId?: number | null
  date: string
}

interface Employee {
  id: number | string
  name: string
  days: (EmployeeDay | null)[]
}

interface DayInfo {
  dayAndmonth: string
  dayweek: string
  dayMonth: number
}

interface ExcelProps {
  scales: Employee[][] // Array de Quinzenas (Páginas), onde cada quinzena é um array de Employee
  monthValue: string
  finishScale: boolean | undefined
}

/**
 * Gera um arquivo Excel com duas abas, uma para cada quinzena da escala.
 * @param props Contém as escalas divididas por quinzena e o mês/ano.
 * @param daysInfo Contém as informações de dia e dia da semana para cada quinzena.
 */
export async function generateScaleByFortnigthExcel(
  props: ExcelProps,
  daysInfo: DayInfo[][],
) {
  const { scales, monthValue } = props

  const workbook = new ExcelJS.Workbook()
  const TOTAL_FORTNIGHTS = scales.length // Deve ser 2 (Quinzena 1 e Quinzena 2)

  const HEADER_COLOR = 'FFE9C4'

  // Loop para criar uma aba para cada quinzena
  for (let page = 0; page < TOTAL_FORTNIGHTS; page++) {
    const sheetTitle = `Quinzena ${page + 1}`
    const sheet = workbook.addWorksheet(sheetTitle)

    const collaborators = scales[page] || []
    const fortnightDays = daysInfo[page] || []

    if (collaborators.length === 0) continue

    // ---------- HEADER 1: Datas (Dia/Mês) ----------
    const dateHeaderRow = ['Colaboradores']
    fortnightDays.forEach((dayInfo) => {
      dateHeaderRow.push(dayInfo.dayAndmonth)
    })

    sheet.addRow(dateHeaderRow)

    // ---------- HEADER 2: Dias da Semana ----------
    const weekDayHeaderRow = ['']
    fortnightDays.forEach((dayInfo) => {
      weekDayHeaderRow.push(dayInfo.dayweek)
    })

    sheet.addRow(weekDayHeaderRow)

    // Estiliza o cabeçalho (Linhas 1 e 2)
    ;[1, 2].forEach((rowNum) => {
      const headerRowInstance = sheet.getRow(rowNum)
      headerRowInstance.height = 25
      headerRowInstance.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: HEADER_COLOR },
        }
        cell.font = { bold: true, color: { argb: '000000' } }
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true,
        }
      })
    })

    // Garante que a primeira célula da Linha 1 tenha o título e a Linha 2 fique vazia
    sheet.getRow(1).getCell(1).value = 'Colaboradores'
    sheet.getRow(2).getCell(1).value = ''

    // ---------- DADOS DO CORPO (Uma linha por Colaborador) ----------
    collaborators.forEach((employee) => {
      const dataRow: (string | null)[] = [employee.name]

      // Itera pelos dias da quinzena atual
      employee.days.forEach((dayData) => {
        let cellValue: string

        // 💡 Lógica atualizada: Se for status "null" ou 0, é 'F' (Folga). Se for 1, é 'T' (Trabalha).
        if (dayData && dayData.status === 1) {
          cellValue = 'T'
        } else {
          cellValue = 'F'
        }

        dataRow.push(cellValue)
      })

      // Adiciona a linha de dados
      const newRow = sheet.addRow(dataRow)

      newRow.getCell(1).font = { bold: true }
      newRow.getCell(1).alignment = { vertical: 'middle' }

      for (let i = 2; i <= fortnightDays.length + 1; i++) {
        const cell = newRow.getCell(i)
        const cellValue = cell.value?.toString()
        let cellBgColor = 'FFFFFFFF'

        if (cellValue === 'T') {
          cellBgColor = 'FFD0F0C0'
        } else if (cellValue === 'F') {
          cellBgColor = 'FFF0D0D0'
        }

        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: cellBgColor },
        }

        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        }
      }
    })

    // ---------- AJUSTE DE LARGURA ----------
    sheet.columns.forEach((col, index) => {
      if (!col) return
      const column = col as ExcelJS.Column

      if (index === 0) {
        // Coluna de nomes
        column.width = 30
      } else {
        // Colunas de dias/status
        column.width = 10
      }
    })
  }

  // ---------- EXPORTAR ----------
  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), `Escala_Quinzena_${monthValue}.xlsx`)
}
