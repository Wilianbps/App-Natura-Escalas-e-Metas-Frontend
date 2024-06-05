import { format } from 'date-fns/format'
import { formatInTimeZone } from 'date-fns-tz'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/services/axios'

import { IScale, IScaleProps, ScalesContextType } from './interfaces'

const ScalesContext = createContext({} as ScalesContextType)

function ScalesProvider({ children }: { children: React.ReactNode }) {
  const [scalesByDate, setScalesByDate] = useState<IScale[]>([])
  const [scaleSummary, setScaleSummary] = useState([])

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
    const response = await api.get('scales/get-scale-summary')

    setScaleSummary(response.data)
  }

  useEffect(() => {
    fetchScaleSummary()
  }, [])

  console.log('scaleSummary', scaleSummary)

  async function updateScalesByDate(scales: IScale[]) {
    console.log(scales)
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

  return (
    <ScalesContext.Provider
      value={{
        fetchScaleByDate,
        updateSetScalesByDate,
        updateScalesByDate,
        scalesByDate,
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
