import { Container, ContainerTable, Footer } from './styles'

export function GoalPerDay() {
  return (
    <Container>
      <ContainerTable>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>01/Mar</th>
              <th>02/Mar</th>
              <th>03/Mar</th>
              <th>04/Mar</th>
              <th>05/Mar</th>
              <th>06/Mar</th>
              <th>07/Mar</th>
            </tr>
            <tr>
              <th>Colaboladores</th>
              <th>Total Mês</th>
              <th>Seg</th>
              <th>Ter</th>
              <th>Qua</th>
              <th>Qui</th>
              <th>Sex</th>
              <th>Sab</th>
              <th>Dom</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>José Maria</td>
              <td>R$36.000,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Mario Andrade</td>
              <td>R$36.000,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Maria Soares</td>
              <td>R$36.000,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Ana Vieira</td>
              <td>R$36.000,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Julia Andressa</td>
              <td>R$36.000,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
              <td>-</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Total diário loja</td>
              <td></td>
              <td>R$6.000,00</td>
              <td>R$6.000,00</td>
              <td>R$6.000,00</td>
              <td>R$6.240,00</td>
              <td>R$4.500,00</td>
              <td>R$6.000,00</td>
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
              <td>R$1.500,00</td>
              <td>R$1.500,00</td>
            </tr>
          </tbody>
        </table>
      </Footer>
    </Container>
  )
}
