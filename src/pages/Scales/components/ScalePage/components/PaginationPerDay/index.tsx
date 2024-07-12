import {
  addDays,
  format,
  isSameMonth,
  lastDayOfMonth,
  parse,
  subDays,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg'

import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { useScales } from '@/contexts/scale/ScalesContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'

import { Container } from './styles'

export function PaginationPerDay() {
  const {
    fetchScaleByDate,
    fetchInputFlow,
    scalesByDate,
    updateGetCurrenDate,
  } = useScales()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Array<string>>([])

  const { monthValue } = useSettings()
  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]
  const initialDate = parse(`01/${month}/${year}`, 'dd/MM/yyyy', new Date())
  const lastDate = lastDayOfMonth(initialDate)
  const [currentDate, setCurrentDate] = useState(initialDate)

  function dayOffValidator() {
    const nameEmployees: Array<string> = []

    const activeDaysGreaterSeven = scalesByDate.map((item) => {
      let isTrue = false
      if (item.activeDays !== undefined) {
        if (item?.activeDays >= 7) {
          const name = formatName(item.name)
          nameEmployees.push(name!)
          isTrue = true
        }
      }
      return isTrue
    })

    if (nameEmployees.length > 0 && activeDaysGreaterSeven) {
      setModalMessage(nameEmployees)
      setIsModalOpen(true)
      return true
    }

    return false
  }

  function advanceDay() {
    const validator = dayOffValidator()

    if (validator) return

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
    updateGetCurrenDate(currentDate.toString())
    fetchScaleByDate(currentDate.toString())
    fetchInputFlow(currentDate.toString())
  }, [currentDate])

  return (
    <Container>
      <section>
        <button
          onClick={goBackDay}
          disabled={currentDate.getTime() === initialDate.getTime()}
        >
          <CgChevronLeft />
        </button>
        <span>{format(currentDate, 'dd - EEEE', { locale: ptBR })}</span>
        <button
          onClick={advanceDay}
          disabled={currentDate.getTime() === lastDate.getTime()}
        >
          <CgChevronRight />
        </button>
      </section>
      {currentDate.getTime() === lastDate.getTime() && (
        <Button
          type="submit"
          text="Finalizar escala"
          color="#000"
          bgColor="#7EC864"
          width="170px"
        />
      )}

      <Modal
        message={modalMessage}
        open={isModalOpen}
        onHandleClose={() => setIsModalOpen(false)}
      />
    </Container>
  )
}
