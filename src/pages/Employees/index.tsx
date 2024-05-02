import { Divider, Switch } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CgPen } from 'react-icons/cg'

import { Button } from '@/components/Button'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'

import ModalEditEmployee from './componentes/ModalEditEmployee'
import { Container, ScaleFlowContainer } from './styles'

interface IEmployeStatus {
  idSeler: number | undefined
  status: boolean
}

export function Employees() {
  const { employees, updateSettings } = useSettings()
  const [openModalEditEmpoyee, setOpenModalEditEmpoyee] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [employeeStatus, setEmployeeStatus] = useState<IEmployeStatus[]>([])
  const [selectedFlow, setSelectedFlow] = useState<string>('')

  const { handleSubmit } = useForm()

  const handleOpenModalEditEmployee = () => {
    setOpenModalEditEmpoyee(true)
  }

  function handleCloseModalEditEmpoyee() {
    setOpenModalEditEmpoyee(false)
  }

  const handleToggleStatus = (employeeId: number) => {
    setEmployeeStatus((prevStatus) =>
      prevStatus.map((employee) =>
        employee.idSeler === employeeId
          ? { ...employee, status: !employee.status }
          : employee,
      ),
    )
  }

  useEffect(() => {
    // Atualizar o estado employeeStatus com os status iniciais dos colaboradores
    if (employees) {
      const initialStatus = employees.map((employee) => ({
        idSeler: employee.idSeler,
        status: employee.status || false,
      }))
      setEmployeeStatus(initialStatus)
    }
  }, [employees])

  function handleChangeFlowScale(flow: string) {
    setSelectedFlow(flow)
  }

  useEffect(() => {
    if (employees.length > 0) setSelectedFlow(employees[0].flowScale || '')
  }, [employees])

  function handleSaveSttings() {
    setIsSubmitting(true)

    const settings = {
      employeeStatus,
      flowScale: selectedFlow,
    }
    setTimeout(async () => {
      updateSettings(settings)
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSaveSttings)}>
        <header>
          <h1>Colaboladores</h1>
        </header>

        <table>
          <thead>
            <tr>
              <td width={50}>Status</td>
              <td width={350}>Nome</td>
              <td width={300}>Código do Colaborador</td>
              <td>Editar</td>
            </tr>
          </thead>

          <tbody>
            {employees?.map((employee) => (
              <>
                <tr key={employee.idSeler}>
                  <td>
                    <Switch
                      checked={
                        employeeStatus.find(
                          (item) => item.idSeler === employee.idSeler,
                        )?.status || false
                      }
                      onChange={() =>
                        employee.idSeler && handleToggleStatus(employee.idSeler)
                      }
                    />
                  </td>
                  <td>{formatName(employee.name)}</td>
                  <td>{employee.idSeler}</td>
                  <td>
                    <div
                      className="circle"
                      onClick={handleOpenModalEditEmployee}
                    >
                      <CgPen />
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <Divider component="div" role="presentation" />
        <ScaleFlowContainer>
          <header>
            <h2>Fluxo Médio</h2>
          </header>
          <section>
            <p>
              Selecione o parâmetro de meses para o fluxo médio da sua escala.
            </p>
          </section>
          <section className="buttons-flow">
            <section>
              <input
                type="radio"
                name="flow"
                id="month3"
                checked={selectedFlow === '3M'}
                onChange={() => handleChangeFlowScale('3M')}
              />
              <label htmlFor="month3">3 meses</label>
            </section>
            <section>
              <input
                type="radio"
                name="flow"
                id="month6"
                checked={selectedFlow === '6M'}
                onChange={() => handleChangeFlowScale('6M')}
              />
              <label htmlFor="month6">6 meses</label>
            </section>
            <section>
              <input
                type="radio"
                name="flow"
                id="year1"
                checked={selectedFlow === '1A'}
                onChange={() => handleChangeFlowScale('1A')}
              />
              <label htmlFor="year1">1 ano</label>
            </section>
          </section>
        </ScaleFlowContainer>
        <footer>
          <Button
            type="submit"
            text="Salvar Configurações"
            color="#000"
            bgColor="#ffe2b3"
            width="212px"
            isSubmitting={isSubmitting}
          />
        </footer>
        <ModalEditEmployee
          open={openModalEditEmpoyee}
          onHandleClose={handleCloseModalEditEmpoyee}
        />
      </form>
    </Container>
  )
}
