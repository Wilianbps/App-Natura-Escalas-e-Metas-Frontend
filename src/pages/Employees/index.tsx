import { Box, Divider, LinearProgress, Switch } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CgPen } from 'react-icons/cg'
import { FaUserGear } from 'react-icons/fa6'
import { MdDeleteForever } from 'react-icons/md'

import { Button } from '@/components/Button'
import { TextInfo } from '@/components/TextInfo'
import { useProfiles } from '@/contexts/profiles/ProfilesContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'

import { ModalAddEmployee } from './componentes/ModalAddEmployee'
import { ModalDeleteEmployee } from './componentes/ModalDeleteEmployee'
import { ModalEditEmployee } from './componentes/ModalEditEmployee'
import ModalEditSettingsEmployee from './componentes/ModalEditSettingsEmployee'
import { IEmployee } from './interfaces'
import { Container, ScaleFlowContainer } from './styles'

interface IEmployeStatus {
  idSeler: number | undefined
  status: boolean
}

export function Employees() {
  const { cookieProfile } = useProfiles()
  const { employees, updateSettings, isLoadingEmployees } = useSettings()
  const [openModalEditSettingsEmpoyee, setOpenModalEditSettingsEmpoyee] =
    useState(false)
  const [openModalEditEmpoyee, setOpenModalEditEmpoyee] = useState(false)
  const [openModalAddEmpoyee, setOpenModalAddEmpoyee] = useState(false)
  const [openModalDeleteEmpoyee, setOpenModalDeleteEmpoyee] = useState(false)
  const [idEmployee, setIdEmplyee] = useState<number>()
  const [dataEmployee, setDataEmployee] = useState<IEmployee>()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [employeeStatus, setEmployeeStatus] = useState<IEmployeStatus[]>([])
  const [selectedFlow, setSelectedFlow] = useState<string>('')

  const { handleSubmit } = useForm()

  const handleOpenModalEditSettingsEmployee = (employee: IEmployee) => {
    setOpenModalEditSettingsEmpoyee(true)
    setDataEmployee(employee)
  }

  function handleCloseModalEditSettingsEmployee() {
    setOpenModalEditSettingsEmpoyee(false)
  }

  function handleOpenModalEditEmployee(employee: IEmployee) {
    setOpenModalEditEmpoyee(true)
    setDataEmployee(employee)
  }

  function handleCloseModalEditEmployee() {
    setOpenModalEditEmpoyee(false)
  }

  const handleOpenModalAddEmplopyee = () => {
    setOpenModalAddEmpoyee(true)
  }

  function handleCloseModalAddEmployee() {
    setOpenModalAddEmpoyee(false)
  }

  const handleOpenModalDeleteEmplopyee = (id: number | undefined) => {
    setIdEmplyee(id)
    setOpenModalDeleteEmpoyee(true)
  }

  function handleCloseModalDeleteEmployee() {
    setOpenModalDeleteEmpoyee(false)
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

      if (
        dataEmployee &&
        employees.find((e) => e.idSeler === dataEmployee.idSeler)
      ) {
        const updatedEmployee = employees.find(
          (e) => e.idSeler === dataEmployee.idSeler,
        )
        setDataEmployee(updatedEmployee)
      }
    }
  }, [employees, dataEmployee])

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

    setTimeout(() => {
      updateSettings(settings)
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <Container>
      {isLoadingEmployees ? (
        <>
          <TextInfo text="Carregando colaboladores..." />
          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <LinearProgress />
          </Box>
        </>
      ) : (
        <>
          {employees.length === 0 && !isLoadingEmployees ? (
            <>
              <header>
                <h1>Colaboradores</h1>
              </header>

              <TextInfo
                marginTop="20px"
                text="Não há colaboradores cadastrados para esta Loja"
              />
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit(handleSaveSttings)}>
                <header>
                  <h1>Colaboradores</h1>
                  {cookieProfile === 'Gerente Loja' && (
                    <button type="button" onClick={handleOpenModalAddEmplopyee}>
                      Cadastrar Colaborador
                    </button>
                  )}
                </header>

                <table>
                  <thead>
                    <tr>
                      <td width={50}>Status</td>
                      <td width={350}>Nome</td>
                      <td width={300}>Código do Colaborador</td>
                      {cookieProfile === 'Gerente Loja' && <td>Configurar</td>}
                      {cookieProfile === 'Gerente Loja' && (
                        <td width={300}>Editar</td>
                      )}
                      {cookieProfile === 'Gerente Loja' && (
                        <td width={300}>Excluir</td>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.idSeler}>
                        <td>
                          <Switch
                            checked={
                              employeeStatus.find(
                                (item) => item.idSeler === employee.idSeler,
                              )?.status || false
                            }
                            onChange={() =>
                              employee.idSeler &&
                              handleToggleStatus(employee.idSeler)
                            }
                          />
                        </td>
                        <td>{formatName(employee.name)}</td>
                        <td>{employee.idSeler}</td>

                        {cookieProfile === 'Gerente Loja' ? (
                          <td>
                            <div
                              className="circle"
                              onClick={() =>
                                handleOpenModalEditSettingsEmployee(employee)
                              }
                            >
                              <FaUserGear />
                            </div>
                          </td>
                        ) : (
                          <td></td>
                        )}

                        {cookieProfile === 'Gerente Loja' ? (
                          <td>
                            <div
                              className="circle"
                              onClick={() =>
                                handleOpenModalEditEmployee(employee)
                              }
                            >
                              <CgPen />
                            </div>
                          </td>
                        ) : (
                          <td></td>
                        )}
                        {cookieProfile === 'Gerente Loja' &&
                        employee.newUser === true ? (
                          <td>
                            <div
                              className="circle"
                              onClick={() =>
                                handleOpenModalDeleteEmplopyee(employee.idSeler)
                              }
                            >
                              <MdDeleteForever fill="#FF5520" size={22} />
                            </div>
                          </td>
                        ) : (
                          <td></td>
                        )}
                      </tr>
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
                      Selecione o parâmetro de meses para o fluxo médio da sua
                      escala.
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
                {cookieProfile === 'Gerente Loja' && (
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
                )}
              </form>
              <ModalEditSettingsEmployee
                open={openModalEditSettingsEmpoyee}
                onHandleClose={handleCloseModalEditSettingsEmployee}
                employee={dataEmployee}
              />
              <ModalEditEmployee
                open={openModalEditEmpoyee}
                onHandleClose={handleCloseModalEditEmployee}
                employee={dataEmployee}
              />
              <ModalAddEmployee
                open={openModalAddEmpoyee}
                onHandleClose={handleCloseModalAddEmployee}
              />
              <ModalDeleteEmployee
                open={openModalDeleteEmpoyee}
                onHandleClose={handleCloseModalDeleteEmployee}
                employeeId={idEmployee}
              />
            </>
          )}
        </>
      )}
    </Container>
  )
}
