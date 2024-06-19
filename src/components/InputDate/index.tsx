import { ChangeEvent } from 'react'

import { StyledInputDate } from './styles'

interface InputDateProps {
  selectMonth: string
  onSelectMonth: (month: string) => void
}

export function InputDate(props: InputDateProps) {
  const { selectMonth, onSelectMonth } = props

  function handleSelectDate(e: ChangeEvent<HTMLInputElement>) {
    onSelectMonth(e.target.value)
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
