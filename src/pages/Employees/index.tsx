import { Switch } from '@mui/material'
import { useState } from 'react'
import { CgPen } from 'react-icons/cg'

import { Button } from '@/components/Button'

import ModalEditEmployee from './componentes/ModalEditEmployee'
import { employess } from './employees'
import { Container } from './styles'

export function Employees() {
  const [openModalEditEmpoyee, setOpenModalEditEmpoyee] = useState(false)

  const handleOpenModalEditEmployee = () => {
    setOpenModalEditEmpoyee(true)
  }

  function handleCloseModalEditEmpoyee() {
    setOpenModalEditEmpoyee(false)
  }

  return (
    <Container>
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
          {employess.map((employee) => (
            <>
              <tr key={employee.id}>
                <td>
                  <Switch />
                </td>
                <td>{employee.name}</td>
                <td>{employee.employeeCode}</td>
                <td>
                  <div className="circle" onClick={handleOpenModalEditEmployee}>
                    <CgPen />
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <footer>
        <Button text="Salvar colaboladores" color="#000" bgColor="#ffe2b3" />
      </footer>
      <ModalEditEmployee
        open={openModalEditEmpoyee}
        onHandleClose={handleCloseModalEditEmpoyee}
      />
    </Container>
  )
}
