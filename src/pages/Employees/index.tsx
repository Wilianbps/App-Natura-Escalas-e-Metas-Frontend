import { Switch } from '@mui/material'
import { CgPen } from 'react-icons/cg'

import { Button } from '@/components/Button'

import { employess } from './employees'
import { Container } from './styles'

export function Employees() {
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
                  <div className="circle">
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
    </Container>
  )
}
