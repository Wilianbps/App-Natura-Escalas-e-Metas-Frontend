import { ChangeEvent } from 'react'

import { StyledInputDate } from './styles'

interface InputDateProps {
  selectMonth: string
  onSelectMonth: (month: string) => void
}

export function InputDate(props: InputDateProps) {
  const { selectMonth, onSelectMonth } = props

  // Obter a data atual
  const currentDate = new Date()

  // Obter o mês e ano atuais
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1 // getMonth() retorna 0 para janeiro, 1 para fevereiro, etc.

  // Formatar mês para estar no formato MM (com zero à esquerda, se necessário)
  const formattedMonth = month < 10 ? `0${month}` : month

  // Definir a string de data no formato YYYY-MM
  const currentMonth = `${year}-${formattedMonth}`

  function handleSelectDate(e: ChangeEvent<HTMLInputElement>) {
    const month = e.target.value

    if (month === '') {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      onSelectMonth(`${year}-${month}`)
    } else {
      onSelectMonth(month)
    }
  }

  return (
    <StyledInputDate
      type="month"
      min="2024-01"
      max={currentMonth}
      value={selectMonth}
      onChange={handleSelectDate}
    />
  )
}
