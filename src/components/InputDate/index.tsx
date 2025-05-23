import { ChangeEvent } from 'react'

import { StyledInputDate } from './styles'

interface InputDateProps {
  selectMonth: string
  onSelectMonth: (month: string) => void
}

export function InputDate(props: InputDateProps) {
  const { selectMonth, onSelectMonth } = props

  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  // Calcular o próximo mês e ajustar o ano
  let nextMonth = month + 1
  let nextYear = year
  if (nextMonth > 12) {
    nextMonth = 1
    nextYear += 1
  }
  const formattedMonth = nextMonth < 10 ? `0${nextMonth}` : nextMonth
  const maxMonth = `${nextYear}-${formattedMonth}`

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
      max={maxMonth}
      value={selectMonth}
      onChange={handleSelectDate}
    />
  )
}
