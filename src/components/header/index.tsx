import { useState } from 'react'

import { DatePickerMUI } from '../DatePickerMUI'
import { SelectStores } from '../Select'
import { ContainerHeader } from './styles'

export function Header() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  function handleSelectDate(date: Date | null) {
    setSelectedDate(date)
  }

  return (
    <ContainerHeader>
      <SelectStores minWidth={120} heightSelect="40px" fontSize="13px" />
      <DatePickerMUI
        selectDate={selectedDate}
        onSelectDate={handleSelectDate}
      />
    </ContainerHeader>
  )
}
