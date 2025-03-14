import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { createContext, useContextSelector } from 'use-context-selector'

import { api } from '@/services/axios'

import { useProfiles } from '../profiles/ProfilesContext'
import {
  IEmployee,
  type IInfoEmployee,
  ISettings,
  type IShifts,
  SettingProviderProps,
  SettingsContextType,
} from './interfaces'

const SettingsContext = createContext({} as SettingsContextType)

function SettingsProvider({ children }: SettingProviderProps) {
  const { store, storesByUser } = useProfiles()
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [shifts, setShifts] = useState<IShifts>({} as IShifts)
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

  async function fetchShifts() {
    await api
      .get(`settings/get-shift-hours?storeCode=${store}`)
      .then((response) => {
        setShifts(response.data)
      })
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
          setEmployees(response.data.employees)
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

  async function addEmployee(employee: IInfoEmployee) {
    const branchName = storesByUser[0]?.branch

    const data = {
      ...employee,
      store,
      branchName,
    }

    const response = await api.post('settings/add-employee', data)

    if (response.status === 200) {
      await fetchEmployes()

      if (response.data.message) {
        toast.success(response.data.message, {
          style: { height: '50px', padding: '15px' },
        })
      }
    }
  }

  async function updateEmployee(
    id: number | undefined,
    employee: IInfoEmployee,
  ) {
    const data = {
      ...employee,
      storeCode: store,
    }

    await api
      .put(`settings/update-employee/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
          setEmployees(response.data.employees)
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

  async function deleteEmployee(id: number | undefined) {
    if (id) {
      const response = await api.delete(`settings/delete-employee/${id}`)

      if (response.status === 200) {
        await fetchEmployes()

        if (response.data.message) {
          toast.success(response.data.message, {
            style: { height: '50px', padding: '15px' },
          })
        }
      }
    }
  }

  async function updateSettingShifts(shifts: IShifts) {
    await api
      .put(`settings/update-shift-hours`, { shifts, storeCode: store })
      .then(() => {
        fetchEmployes()
        fetchShifts()
        toast.success('Turnos salvos com sucesso', {
          style: { height: '50px', padding: '15px' },
        })
      })
      .catch(() => {
        toast.error('Erro ao salvar os turnos', {
          style: { height: '50px', padding: '15px' },
        })
      })
  }

  useEffect(() => {
    if (store) {
      fetchEmployes()
      fetchShifts()
    }
  }, [store])

  return (
    <SettingsContext.Provider
      value={{
        updateShiftRestSchedule,
        employees,
        shifts,
        updateSettingShifts,
        updateSettings,
        updateselectDate,
        selectedDate,
        fetchEmployes,
        monthValue,
        updateMonthValue,
        isLoadingEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
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

  const shifts = useContextSelector(
    SettingsContext,
    (context) => context.shifts,
  )

  const updateSettingShifts = useContextSelector(
    SettingsContext,
    (context) => context.updateSettingShifts,
  )

  const updateSettings = useContextSelector(
    SettingsContext,
    (context) => context.updateSettings,
  )

  const addEmployee = useContextSelector(
    SettingsContext,
    (context) => context.addEmployee,
  )

  const updateEmployee = useContextSelector(
    SettingsContext,
    (context) => context.updateEmployee,
  )

  const deleteEmployee = useContextSelector(
    SettingsContext,
    (context) => context.deleteEmployee,
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
    shifts,
    updateSettingShifts,
    updateSettings,
    updateselectDate,
    selectedDate,
    fetchEmployes,
    monthValue,
    updateMonthValue,
    isLoadingEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  }
}

export { SettingsContext, SettingsProvider, useSettings }
