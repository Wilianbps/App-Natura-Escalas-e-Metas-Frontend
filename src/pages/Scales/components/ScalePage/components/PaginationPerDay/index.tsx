import { Typography } from '@mui/material'
import {
  addDays,
  format,
  isSameMonth,
  lastDayOfMonth,
  parse,
  subDays,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { formatInTimeZone } from 'date-fns-tz'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg'

import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { useProfiles } from '@/contexts/profiles/ProfilesContext'
import { useScales } from '@/contexts/scale/ScalesContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'

import { ModalFinishScale } from '../ModalFinishScale.tsx'
import { Container } from './styles'

export function PaginationPerDay() {
  const {
    fetchScaleByDate,
    fetchInputFlow,
    scalesByDate,
    updateGetCurrenDate,
    dataFinishScale,
    isLoadingScale,
  } = useScales()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isModalOpenFinishScale, setIsModalOpenFinishScale] =
    useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Array<string>>([])
  const { cookieProfile } = useProfiles()
  const { monthValue } = useSettings()
  const date = new Date()
  const currentMonth = (date.getMonth() + 1).toString().padStart(2, '0')
  const currentYear = date.getFullYear().toString()
  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]
  const initialDate = parse(`01/${month}/${year}`, 'dd/MM/yyyy', new Date())
  const lastDate = lastDayOfMonth(initialDate)
  const nameFormatted = formatName(dataFinishScale[0]?.loginUser)

  const scaleEndDate = dataFinishScale[0]?.endDate
    ? formatInTimeZone(dataFinishScale[0]?.endDate, 'UTC', 'dd/MM/yyyy')
    : ''

  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const savedDate = Cookies.get('currentDateScale')
    if (savedDate) {
      const parsedSavedDate = new Date(savedDate)
      const savedMonth = (parsedSavedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')
      const savedYear = parsedSavedDate.getFullYear().toString()

      // Verifica se o mês e o ano do cookie correspondem ao mês e ano atuais
      if (savedMonth === month && savedYear === year) {
        return parsedSavedDate
      }
    }
    return initialDate
  })

  const [isAdvanceDisabled, setIsAdvanceDisabled] = useState(false)
  const [isBackDisabled, setIsBackDisabled] = useState(false)

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

    setIsAdvanceDisabled(true) // Desabilita o botão

    const newDate = addDays(currentDate, 1)

    if (isSameMonth(newDate, currentDate)) {
      setCurrentDate(newDate)
      Cookies.set('currentDateScale', newDate.toISOString()) // Define como cookie de sessão
    }

    // Reverte a desabilitação após 0,5 segundos
    setTimeout(() => {
      setIsAdvanceDisabled(false)
    }, 500)
  }

  function goBackDay() {
    setIsBackDisabled(true) // Desabilita o botão

    const newDate = subDays(currentDate, 1)

    if (isSameMonth(newDate, currentDate)) {
      setCurrentDate(newDate)
      Cookies.set('currentDateScale', newDate.toISOString()) // Define como cookie de sessão
    }

    // Reverte a desabilitação após 0,5 segundos
    setTimeout(() => {
      setIsBackDisabled(false)
    }, 500)
  }

  function handleOpenModalFinishedScale() {
    setIsModalOpenFinishScale(true)
  }

  useEffect(() => {
    updateGetCurrenDate(currentDate.toString())
    fetchScaleByDate(currentDate.toString())
    fetchInputFlow(currentDate.toString())
  }, [currentDate])

  // Atualiza a data inicial quando month ou year mudarem e limpa o cookie
  useEffect(() => {
    const newInitialDate = parse(
      `01/${month}/${year}`,
      'dd/MM/yyyy',
      new Date(),
    )
    setCurrentDate((prevDate) => {
      if (!isSameMonth(newInitialDate, prevDate)) {
        Cookies.remove('currentDateScale')
        Cookies.set('currentDateScale', newInitialDate.toISOString()) // Define como cookie de sessão
        return newInitialDate
      }
      return prevDate
    })
  }, [month, year])

  // Remover o cookie quando o navegador for fechado
  useEffect(() => {
    const handleUnload = () => {
      Cookies.remove('currentDateScale')
    }

    window.addEventListener('beforeunload', handleUnload)

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [])

  return (
    <Container>
      <section>
        <button
          onClick={goBackDay}
          disabled={
            isBackDisabled ||
            isAdvanceDisabled ||
            isLoadingScale ||
            currentDate.getTime() === initialDate.getTime()
          }
        >
          <CgChevronLeft />
        </button>
        <span>{format(currentDate, 'dd - EEEE', { locale: ptBR })}</span>

        <button
          onClick={advanceDay}
          disabled={
            isAdvanceDisabled ||
            isBackDisabled ||
            isLoadingScale ||
            currentDate.getTime() === lastDate.getTime()
          }
        >
          <CgChevronRight />
        </button>
      </section>

      {currentDate.getTime() === lastDate.getTime() &&
        dataFinishScale[0]?.finished === false &&
        cookieProfile === 'Gerente Loja' &&
        month === currentMonth &&
        year === currentYear && (
          <Button
            type="button"
            text="Finalizar escala"
            color="#000"
            bgColor="#7EC864"
            width="170px"
            onClick={handleOpenModalFinishedScale}
          />
        )}

      {dataFinishScale[0]?.finished === true &&
        cookieProfile === 'Gerente Loja' &&
        month === currentMonth &&
        year === currentYear && (
          <Typography style={{ color: '#449428', fontWeight: 'bold' }}>
            Escala finalizada dia {scaleEndDate} por {nameFormatted}
          </Typography>
        )}

      <Modal
        message={modalMessage}
        open={isModalOpen}
        onHandleClose={() => setIsModalOpen(false)}
      />

      <ModalFinishScale
        open={isModalOpenFinishScale}
        onHandleClose={() => setIsModalOpenFinishScale(false)}
      />
    </Container>
  )
}
