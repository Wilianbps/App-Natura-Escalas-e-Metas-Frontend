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

  async function fetchEmployes() {
    const response = await api.get('settings/getAllEmployees')

    setEmployees(response.data)
  }

  useEffect(() => {
    fetchEmployes()
  }, [])

  async function updateShiftRestSchedule(employee: IEmployee) {
    console.log('update folga', employee)
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

    if (response.data.message) {
      toast.success(response.data.message, {
        style: { height: '50px', padding: '15px' },
      })
    }
  }

  return (
    <SettingsContext.Provider
      value={{ updateShiftRestSchedule, employees, updateSettings }}
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
