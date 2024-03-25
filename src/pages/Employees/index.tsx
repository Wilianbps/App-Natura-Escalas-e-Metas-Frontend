import { Switch } from '@mui/material'

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
          <tr>
            <td>
              <Switch />
            </td>
            <td>Ana Luíza Ribeiro</td>
            <td>00040</td>
            <td>editar</td>
          </tr>
          <tr>
            <td>
              <Switch />
            </td>
            <td>Ana Luíza Ribeiro</td>
            <td>00057</td>
            <td>editar</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
