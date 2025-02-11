import { format } from 'date-fns/format'
import { formatInTimeZone } from 'date-fns-tz'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { createContext, useContextSelector } from 'use-context-selector'

import { api } from '@/services/axios'

import { useProfiles } from '../profiles/ProfilesContext'
import { useSettings } from '../setting/SettingContext'
import {
  DataType,
  IDataFinishScale,
  IScale,
  IScaleApprovalRequest,
  IScaleProps,
  IScaleSummary,
  ScalesContextType,
} from './interfaces'

const ScalesContext = createContext({} as ScalesContextType)

function ScalesProvider({ children }: { children: React.ReactNode }) {
  const { store, cookieUserLogin } = useProfiles()
  const { fetchEmployes, monthValue } = useSettings()
  const [scalesByDate, setScalesByDate] = useState<IScale[]>([])
  const [dataFinishScale, setDataFinishScale] = useState<IDataFinishScale[]>([])
  const [scaleSummary, setScaleSummary] = useState<Array<IScaleSummary[]>>([])
  const [scaleSummaryByFortnight, setScaleSummaryByFortnight] = useState<
    Array<IScaleSummary[]>
  >([])
  const [inputFlow, setInputFlow] = useState<DataType[]>([])
  const [dataScaleApprovalRequest, setDataScaleApprovalRequest] = useState<
    IScaleApprovalRequest[]
  >([])
  const [isLoadingScale, setIsLoadingScale] = useState(false)

  const [getCurrentDate, setGetCurrentDate] = useState('')

  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  function updateGetCurrenDate(date: string) {
    setGetCurrentDate(date)
  }

  async function fetchScaleByDate(date: string) {
    if (date) {
      setIsLoadingScale(true)
      const dateFormatted = format(date, 'yyyy-MM-dd')

      await api
        .get(
          `scales/get-scale-by-date?date=${dateFormatted}&storeCode=${store}`,
        )
        .then((response) => {
          setScalesByDate(response.data.result)
          setIsLoadingScale(false)
        })
    }
  }

  function updateSetScalesByDate(scale: IScale[]) {
    setScalesByDate(scale)
  }

  async function fetchScaleSummary() {
    const response = await api.get(
      `scales/get-scale-summary?month=${month}&year=${year}&storeCode=${store}`,
    )

    setScaleSummary(response.data)
  }

  async function fetchScaleSummaryByFortnight() {
    const response = await api.get(
      `scales/get-scale-summary-by-fortnight?month=${month}&year=${year}&storeCode=${store}`,
    )

    setScaleSummaryByFortnight(response.data)
  }

  async function fetchInputFlow(date: string) {
    const dateFormatted = format(date, 'yyyy-MM-dd')
    const response = await api.get(
      `scales/get-input-flow?date=${dateFormatted}&codeStore=${store}`,
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
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.message) {
            toast.success(response.data.message, {
              style: { height: '50px', padding: '15px' },
            })
          }
          await fetchScaleByDate(getCurrentDate)
          await fetchScaleSummary()
          await fetchScaleSummaryByFortnight()
          await fetchEmployes()
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
          `scales/load-scale-of-month?storeCode=${store}&loginUser=${cookieUserLogin}&date=${date}&currentDate=${currentDate}&finished=${0}`,
        )
        .then(async () => {
          const dateFormatted = `${year}-${month}-01`
          await fetchFinishedScaleByMonth()
          await fetchScaleByDate(dateFormatted)
          await fetchScaleSummary()
          await fetchEmployes()
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
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newDate = new Date()
    const day = newDate.getDate().toString().padStart(2, '0')
    const currentDate = `${year}${month}${day}`
    return await api
      .put(
        `scales/update-finished-scale?userLogin=${cookieUserLogin}&storeCode=${store}&month=${month}&year=${year}&endScaleDate=${currentDate}`,
      )
      .then(async () => {
        await fetchFinishedScaleByMonth()

        toast.success('Escala finalizada com sucesso', {
          style: { height: '50px', padding: '15px' },
        })
      })
      .catch(() => {
        toast.error('Erro ao finalizar a escala', {
          style: { height: '50px', padding: '15px' },
        })
      })
  }

  async function fetchGetScaleApprovalByDate() {
    await api
      .get(
        `scales/get-scales-approval-request?userLogin=${cookieUserLogin}&month=${month}&year=${year}`,
      )
      .then((response) => {
        setDataScaleApprovalRequest(response.data)
      })
  }

  async function postScaleApprovalRequest() {
    await fetchGetScaleApprovalByDate()
    const newDate = new Date()
    const day = newDate.getDate().toString().padStart(2, '0')
    const currentDate = `${year}${month}${day}`
    const data = {
      description: 'solicitaçao de aprovação',
      responsible: cookieUserLogin,
      storeCode: store,
      branch: store,
      requestDate: currentDate,
      status: 0,
    }
    await api
      .post(`scales/post-scales-approval-request`, data)
      .then(async (response) => {
        await fetchGetScaleApprovalByDate()

        if (response.status === 200) {
          toast.success('Aprovação solicitada com sucesso', {
            style: { height: '50px', padding: '15px' },
          })
        }
      })
  }

  async function updateScaleApprovalRequest(
    id: string,
    status: number,
    storeCode: string,
  ) {
    const newDate = new Date()
    const day = newDate.getDate().toString().padStart(2, '0')
    const currentDate = `${year}${month}${day}`
    await api
      .put(
        `scales/put-scales-approval-request?id=${id}&month=${month}&year=${year}&storeCode=${storeCode}&approvalDate=${currentDate}&status=${status}`,
      )
      .then(async () => {
        await fetchGetScaleApprovalByDate()
        if (status === 1) {
          toast.success('Aprovação feita com sucesso', {
            style: { height: '50px', padding: '15px' },
          })
        } else if (status === 2) {
          toast.success('Cancelado com sucesso', {
            style: { height: '50px', padding: '15px' },
          })
        }
      })
  }

  useEffect(() => {
    if (store) {
      fetchGetScaleApprovalByDate()
      fetchScaleSummary()
      fetchScaleSummaryByFortnight()
      fetchFinishedScaleByMonth()
      fetchScaleByDate(getCurrentDate)
    }
  }, [monthValue, store])

  return (
    <ScalesContext.Provider
      value={{
        fetchScaleByDate,
        updateSetScalesByDate,
        updateScalesByDate,
        scalesByDate,
        updateGetCurrenDate,
        scaleSummary,
        scaleSummaryByFortnight,
        inputFlow,
        fetchInputFlow,
        fetchLoadMonthScale,
        dataFinishScale,
        updateFinishedScaleByMonth,
        postScaleApprovalRequest,
        fetchGetScaleApprovalByDate,
        updateScaleApprovalRequest,
        dataScaleApprovalRequest,
        isLoadingScale,
      }}
    >
      {children}
    </ScalesContext.Provider>
  )
}

function useScales() {
  const scalesByDate = useContextSelector(
    ScalesContext,
    (context) => context.scalesByDate,
  )
  const updateSetScalesByDate = useContextSelector(
    ScalesContext,
    (context) => context.updateSetScalesByDate,
  )
  const fetchScaleByDate = useContextSelector(
    ScalesContext,
    (context) => context.fetchScaleByDate,
  )
  const updateScalesByDate = useContextSelector(
    ScalesContext,
    (context) => context.updateScalesByDate,
  )
  const updateGetCurrenDate = useContextSelector(
    ScalesContext,
    (context) => context.updateGetCurrenDate,
  )
  const scaleSummary = useContextSelector(
    ScalesContext,
    (context) => context.scaleSummary,
  )

  const scaleSummaryByFortnight = useContextSelector(
    ScalesContext,
    (context) => context.scaleSummaryByFortnight,
  )

  const inputFlow = useContextSelector(
    ScalesContext,
    (context) => context.inputFlow,
  )
  const fetchInputFlow = useContextSelector(
    ScalesContext,
    (context) => context.fetchInputFlow,
  )
  const fetchLoadMonthScale = useContextSelector(
    ScalesContext,
    (context) => context.fetchLoadMonthScale,
  )
  const dataFinishScale = useContextSelector(
    ScalesContext,
    (context) => context.dataFinishScale,
  )
  const updateFinishedScaleByMonth = useContextSelector(
    ScalesContext,
    (context) => context.updateFinishedScaleByMonth,
  )
  const postScaleApprovalRequest = useContextSelector(
    ScalesContext,
    (context) => context.postScaleApprovalRequest,
  )
  const fetchGetScaleApprovalByDate = useContextSelector(
    ScalesContext,
    (context) => context.fetchGetScaleApprovalByDate,
  )
  const updateScaleApprovalRequest = useContextSelector(
    ScalesContext,
    (context) => context.updateScaleApprovalRequest,
  )
  const dataScaleApprovalRequest = useContextSelector(
    ScalesContext,
    (context) => context.dataScaleApprovalRequest,
  )
  const isLoadingScale = useContextSelector(
    ScalesContext,
    (context) => context.isLoadingScale,
  )

  return {
    scalesByDate,
    updateSetScalesByDate,
    fetchScaleByDate,
    updateScalesByDate,
    updateGetCurrenDate,
    scaleSummary,
    scaleSummaryByFortnight,
    inputFlow,
    fetchInputFlow,
    fetchLoadMonthScale,
    dataFinishScale,
    updateFinishedScaleByMonth,
    postScaleApprovalRequest,
    fetchGetScaleApprovalByDate,
    updateScaleApprovalRequest,
    dataScaleApprovalRequest,
    isLoadingScale,
  }
}

export { ScalesContext, ScalesProvider, useScales }
