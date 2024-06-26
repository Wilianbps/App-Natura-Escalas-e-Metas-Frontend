import { parse } from 'date-fns'
import { format } from 'date-fns/format'
import { formatInTimeZone } from 'date-fns-tz'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/services/axios'

import { useSettings } from '../setting/SettingContext'
import {
  IScale,
  IScaleProps,
  IScaleSummary,
  ScalesContextType,
} from './interfaces'

const ScalesContext = createContext({} as ScalesContextType)

function ScalesProvider({ children }: { children: React.ReactNode }) {
  const { fetchEmployes, monthValue } = useSettings()
  const [scalesByDate, setScalesByDate] = useState<IScale[]>([])
  const [scaleSummary, setScaleSummary] = useState<Array<IScaleSummary[]>>([])

  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

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
    /*     const month = selectedDate && selectedDate.getMonth() + 1
    const year = selectedDate?.getFullYear() */

    const response = await api.get(
      `scales/get-scale-summary?month=${month}&year=${year}`,
    )

    setScaleSummary(response.data)
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
          const newDate = parse(`01/${month}/${year}`, 'dd/MM/yyyy', new Date())
          fetchScaleByDate(newDate.toString())
          fetchScaleSummary()
          fetchEmployes()
        }
      })
      .catch((error) => {
        if (error.response) {
          const err = error.response.data.message
          toast.error(err, {
            style: { height: '50px', padding: '15px' },
          })
        }
      })
  }

  useEffect(() => {
    fetchScaleSummary()
  }, [monthValue])

  return (
    <ScalesContext.Provider
      value={{
        fetchScaleByDate,
        updateSetScalesByDate,
        updateScalesByDate,
        scalesByDate,
        scaleSummary,
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
