import { Container, ContainerTable, Footer } from './styles'

export function GoalPearWeek() {
  return (
    <Container>
      <ContainerTable>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Semana 1</th>
              <th>Semana 2</th>
              <th>Semana 3</th>
              <th>Semana 4</th>
              <th>Semana 5</th>
            </tr>
            <tr>
              <th>Colaboladores</th>
              <th>Total Mês</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>José Maria</td>
              <td>R$36.000,00</td>
              <td>R$9.000,00</td>
              <td>R$7.500,00</td>
              <td>R$9.000,00</td>
              <td>R$7.500,00</td>
              <td>R$3.000,00</td>
            </tr>
            <tr>
              <td>Mario Andrade</td>
              <td>R$36.000,00</td>
              <td>R$9.000,00</td>
              <td>R$7.500,00</td>
              <td>R$9.000,00</td>
              <td>R$7.500,00</td>
              <td>R$3.000,00</td>
            </tr>
            <tr>
              <td>Maria Soares</td>
              <td>R$36.000,00</td>
              <td>R$9.000,00</td>
              <td>R$7.500,00</td>
              <td>R$9.000,00</td>
              <td>R$7.500,00</td>
              <td>R$3.000,00</td>
            </tr>
            <tr>
              <td>Ana Vieira</td>
              <td>R$36.000,00</td>
              <td>R$9.000,00</td>
              <td>R$7.500,00</td>
              <td>R$9.000,00</td>
              <td>R$7.500,00</td>
              <td>R$3.000,00</td>
            </tr>
            <tr>
              <td>Julia Andresa</td>
              <td>R$36.000,00</td>
              <td>R$9.000,00</td>
              <td>R$7.500,00</td>
              <td>R$9.000,00</td>
              <td>R$7.500,00</td>
              <td>R$3.000,00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Total semanal loja</td>
              <td></td>
              <td>R$6.000,00</td>
              <td>R$6.000,00</td>
              <td>R$6.000,00</td>
              <td>R$6.240,00</td>
              <td>R$4.500,00</td>
            </tr>
          </tfoot>
        </table>
      </ContainerTable>

      <Footer>
        <p>Colaborador Extra</p>

        <table>
          <tbody>
            <tr>
              <td>Márcia Santos</td>
              <td>R$36.000,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
            </tr>
          </tbody>
        </table>
      </Footer>
    </Container>
  )
}
