import { addDays, format, isSameMonth, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg'

import { Container } from './styles'

export function PaginationPerDay() {
  const [currentDate, setCurrentDate] = useState(new Date())

  function advanceDay() {
    const newDate = addDays(currentDate, 1)

    if (isSameMonth(newDate, currentDate)) {
      setCurrentDate(newDate)
    }
  }

  function goBackDay() {
    const newDate = subDays(currentDate, 1)

    if (isSameMonth(newDate, currentDate)) {
      setCurrentDate(newDate)
    }
  }

  return (
    <Container>
      <button onClick={goBackDay}>
        <CgChevronLeft />
      </button>
      <span>{format(currentDate, 'dd - EEEE', { locale: ptBR })}</span>
      <button onClick={advanceDay}>
        <CgChevronRight />
      </button>
    </Container>
  )
}
