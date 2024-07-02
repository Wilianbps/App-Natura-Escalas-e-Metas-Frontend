import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/services/axios'

import {
  IEmployee,
  ISettings,
  SettingProviderProps,
  SettingsContextType,
} from './interfaces'

const SettingsContext = createContext({} as SettingsContextType)

function SettingsProvider({ children }: SettingProviderProps) {
  const [employees, setEmployees] = useState<IEmployee[]>([])

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
    const response = await api.get('settings/getAllEmployees')
    setEmployees(response.data)
  }

  useEffect(() => {
    fetchEmployes()
  }, [])

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
      .put('settings/updateShiftRestSchedule', {
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

    const response = await api.put('settings/updateSettings', {
      employeeStatus: employeeStatusFormated,
      flowScale,
    })

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
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

function useSettings() {
  const context = useContext(SettingsContext)
  return context
}

export { SettingsContext, SettingsProvider, useSettings }
