import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { createContext, useContextSelector } from 'use-context-selector'

import { api } from '@/services/axios'

import { useProfiles } from '../profiles/ProfilesContext'
import {
  IEmployee,
  ISettings,
  SettingProviderProps,
  SettingsContextType,
} from './interfaces'

const SettingsContext = createContext({} as SettingsContextType)

function SettingsProvider({ children }: SettingProviderProps) {
  const { store } = useProfiles()
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const getCurrentMonth = (): string => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // Adiciona zero à esquerda se necessário
    return `${year}-${month}`
  }
  const [monthValue, setMonthValue] = useState<string>(getCurrentMonth())

  function updateMonthValue(month: string) {
    setMonthValue(month)
  }

  function updateselectDate(date: Date | null) {
    setSelectedDate(date)
  }

  async function fetchEmployes() {
    setIsLoadingEmployees(true)
    await api
      .get(`settings/getAllEmployees?storeCode=${store}`)
      .then((response) => {
        setEmployees(response.data)
        setIsLoadingEmployees(false)
      })
  }

  useEffect(() => {
    if (store) {
      fetchEmployes()
    }
  }, [store])

  async function updateShiftRestSchedule(employee: IEmployee) {
    const {
      idSeler,
      idDayOff,
      storeCode,
      userLogin,
      idShift,
      shift,
      startVacation,
      finishVacation,
      arrayDaysOff,
      arrayVacation,
    } = employee

    await api
      .put(`settings/updateShiftRestSchedule?storeCode=${store}`, {
        idSeler,
        idDayOff,
        storeCode,
        userLogin,
        idShift,
        shift,
        startVacation,
        finishVacation,
        arrayDaysOff,
        arrayVacation,
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.message) {
            toast.success(response.data.message, {
              style: { height: '50px', padding: '15px' },
            })
          }
        }
        fetchEmployes()
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

  async function updateSettings(settings: ISettings) {
    const { employeeStatus, flowScale } = settings

    const employeeStatusFormated = employeeStatus.map((item) => ({
      idSeler: item.idSeler,
      status: item.status ? 1 : 0,
    }))

    const response = await api.put(
      `settings/updateSettings?storeCode=${store}`,
      {
        employeeStatus: employeeStatusFormated,
        flowScale,
      },
    )

    const updatedEmployees = employees.map((employee) => {
      const updatedStatus = employeeStatus.find(
        (item) => item.idSeler === employee.idSeler,
      )

      return updatedStatus
        ? { ...employee, status: updatedStatus.status, flowScale }
        : employee
    })

    setEmployees(updatedEmployees)

    if (response.status === 200) {
      if (response.data.message) {
        toast.success(response.data.message, {
          style: { height: '50px', padding: '15px' },
        })
      }
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        updateShiftRestSchedule,
        employees,
        updateSettings,
        updateselectDate,
        selectedDate,
        fetchEmployes,
        monthValue,
        updateMonthValue,
        isLoadingEmployees,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

function useSettings() {
  const updateShiftRestSchedule = useContextSelector(
    SettingsContext,
    (context) => context.updateShiftRestSchedule,
  )
  const employees = useContextSelector(
    SettingsContext,
    (context) => context.employees,
  )
  const updateSettings = useContextSelector(
    SettingsContext,
    (context) => context.updateSettings,
  )
  const updateselectDate = useContextSelector(
    SettingsContext,
    (context) => context.updateselectDate,
  )
  const selectedDate = useContextSelector(
    SettingsContext,
    (context) => context.selectedDate,
  )
  const fetchEmployes = useContextSelector(
    SettingsContext,
    (context) => context.fetchEmployes,
  )
  const monthValue = useContextSelector(
    SettingsContext,
    (context) => context.monthValue,
  )
  const updateMonthValue = useContextSelector(
    SettingsContext,
    (context) => context.updateMonthValue,
  )

  const isLoadingEmployees = useContextSelector(
    SettingsContext,
    (context) => context.isLoadingEmployees,
  )

  return {
    updateShiftRestSchedule,
    employees,
    updateSettings,
    updateselectDate,
    selectedDate,
    fetchEmployes,
    monthValue,
    updateMonthValue,
    isLoadingEmployees,
  }
}

export { SettingsContext, SettingsProvider, useSettings }
