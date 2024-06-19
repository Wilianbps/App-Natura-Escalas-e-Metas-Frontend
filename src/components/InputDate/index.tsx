import { ChangeEvent } from 'react'

import { StyledInputDate } from './styles'

interface InputDateProps {
  selectMonth: string
  onSelectMonth: (month: string) => void
}

export function InputDate(props: InputDateProps) {
  const { selectMonth, onSelectMonth } = props

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
      value={selectMonth}
      onChange={handleSelectDate}
    />
  )
}
