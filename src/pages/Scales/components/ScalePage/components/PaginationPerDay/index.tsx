import { addDays, format, isSameMonth, parse, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg'

import { useScales } from '@/contexts/scale/ScalesContext'
import { useSettings } from '@/contexts/setting/SettingContext'

import { Container } from './styles'

export function PaginationPerDay() {
  const { fetchScaleByDate } = useScales()
  const { monthValue } = useSettings()

  const month = monthValue.split('-')[1]

  const year = monthValue.split('-')[0]

  const initialDate = parse(`01/${month}/${year}`, 'dd/MM/yyyy', new Date())

  const [currentDate, setCurrentDate] = useState(initialDate)

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

  useEffect(() => {
    const newDate = parse(`01/${month}/${year}`, 'dd/MM/yyyy', new Date())
    setCurrentDate(newDate)
  }, [month, year])

  useEffect(() => {
    fetchScaleByDate(currentDate.toString())
  }, [currentDate])

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
