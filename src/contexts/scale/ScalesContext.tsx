import { format } from 'date-fns/format'
import { formatInTimeZone } from 'date-fns-tz'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/services/axios'

import { useProfiles } from '../profiles/ProfilesContext'
import { useSettings } from '../setting/SettingContext'
import {
  DataType,
  IDataFinishScale,
  IScale,
  IScaleProps,
  IScaleSummary,
  ScalesContextType,
} from './interfaces'

const ScalesContext = createContext({} as ScalesContextType)

function ScalesProvider({ children }: { children: React.ReactNode }) {
  const { cookieStoreCode, cookieUserLogin } = useProfiles()
  const { fetchEmployes, monthValue } = useSettings()
  const [scalesByDate, setScalesByDate] = useState<IScale[]>([])
  const [dataFinishScale, setDataFinishScale] = useState<IDataFinishScale[]>([])
  const [scaleSummary, setScaleSummary] = useState<Array<IScaleSummary[]>>([])
  const [inputFlow, setInputFlow] = useState<DataType[]>([])
  const [getCurrentDate, setGetCurrentDate] = useState('')

  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  function updateGetCurrenDate(date: string) {
    setGetCurrentDate(date)
  }

  async function fetchScaleByDate(date: string) {
    const dateFormatted = format(date, 'yyyy-MM-dd')
    const response = await api.get(
      `scales/get-scale-by-date?date=${dateFormatted}`,
    )
    setScalesByDate(response.data.result)
  }

  function updateSetScalesByDate(scale: IScale[]) {
    setScalesByDate(scale)
  }

  async function fetchScaleSummary() {
    const response = await api.get(
      `scales/get-scale-summary?month=${month}&year=${year}`,
    )

    setScaleSummary(response.data)
  }

  async function fetchInputFlow(date: string) {
    const dateFormatted = format(date, 'yyyy-MM-dd')
    const response = await api.get(
      `http://localhost:3333/api/scales/get-input-flow?date=${dateFormatted}&codeStore=${cookieStoreCode}`,
    )

    setInputFlow(response.data)
  }

  async function updateScalesByDate(scales: IScale[]) {
    const data = scales.map((scale) => {
      const objScale: IScaleProps = {
        id: scale.id,
        date: formatInTimeZone(scale.date, 'UTC', 'yyyy-MM-dd'),
        turn:
          scale.turn === 'T1'
            ? 1
            : scale.turn === 'T2'
              ? 2
              : scale.turn === 'T3'
                ? 3
                : null,
        status: scale.status === true ? 1 : 0,
        options: scale.options,
      }

      return objScale
    })
    await api
      .put(`scales/update-scale-by-date`, { data })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.message) {
            toast.success(response.data.message, {
              style: { height: '50px', padding: '15px' },
            })
          }
          fetchScaleByDate(getCurrentDate)
          fetchScaleSummary()
          fetchEmployes()
          return false
        }
      })
      .catch((error) => {
        if (error.response) {
          const err = error.response.data.message
          toast.error(err, {
            style: { height: '50px', padding: '15px' },
          })
        }
        return false
      })
  }

  async function fetchFinishedScaleByMonth() {
    await api
      .get(`scales/get-finished-scale-by-month?month=${month}&year=${year}`)
      .then((response) => {
        setDataFinishScale(response.data)
      })
  }

  async function fetchLoadMonthScale(date: string) {
    await fetchFinishedScaleByMonth()
    const newDate = new Date()
    const day = newDate.getDate().toString().padStart(2, '0')
    const currentDate = `${year}${month}${day}`

    if (dataFinishScale.length === 0) {
      await api
        .get(
          `scales/load-scale-of-month?storeCode=${cookieStoreCode}&loginUser=${cookieUserLogin}&date=${date}&currentDate=${currentDate}&finished=${0}`,
        )
        .then(() => {
          const dateFormatted = `${year}-${month}-01`
          fetchFinishedScaleByMonth()
          fetchScaleByDate(dateFormatted)
          fetchScaleSummary()
          fetchEmployes()
          toast.success('Escala carregada com sucesso', {
            style: { height: '50px', padding: '15px' },
          })
        })
    } else {
      toast.error('Escala desse mês ja foi carregada', {
        style: { height: '50px', padding: '15px' },
      })
    }
  }

  async function updateFinishedScaleByMonth() {
    const newDate = new Date()
    const day = newDate.getDate().toString().padStart(2, '0')
    const currentDate = `${year}${month}${day}`
    await api
      .put(
        `scales/update-finished-scale?storeCode=${cookieStoreCode}&month=${month}&year=${year}&endScaleDate=${currentDate}`,
      )
      .then(() => {
        if (dataFinishScale) {
          setDataFinishScale((prevState) =>
            prevState.map((item) => ({
              ...item,
              endDate: currentDate,
              finished: true,
            })),
          )
        }
      })
  }

  useEffect(() => {
    fetchScaleSummary()
    fetchFinishedScaleByMonth()
  }, [monthValue])

  return (
    <ScalesContext.Provider
      value={{
        fetchScaleByDate,
        updateSetScalesByDate,
        updateScalesByDate,
        scalesByDate,
        updateGetCurrenDate,
        scaleSummary,
        inputFlow,
        fetchInputFlow,
        fetchLoadMonthScale,
        dataFinishScale,
        updateFinishedScaleByMonth,
      }}
    >
      {children}
    </ScalesContext.Provider>
  )
}

function useScales() {
  const context = useContext(ScalesContext)
  return context
}

export { ScalesContext, ScalesProvider, useScales }
