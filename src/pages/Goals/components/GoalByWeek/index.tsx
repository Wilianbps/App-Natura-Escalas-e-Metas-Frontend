import { useGoals } from '@/contexts/goals/GoalsContext'
import { formatName } from '@/libs/formatName'
import { formatNumber } from '@/libs/formatNumber'

import { Container, ContainerTable, Footer } from './styles'

export function GoalByWeek() {
  const { goalsByWeek } = useGoals()

  console.log('goalsByWeek na meta', goalsByWeek)

  goalsByWeek.employeesByWeeks.forEach((item) => {
    item.weeks.forEach((week) => {
      console.log(week.days.goalDayByEmployee)
    })
  })

  return (
    <Container>
      <ContainerTable>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>

              {Array.from({ length: goalsByWeek.weeksSums.length }).map(
                (_, index) => (
                  <th key={index}>Semana {index + 1}</th>
                ),
              )}
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
            {goalsByWeek?.employeesByWeeks?.map((item) => (
              <tr key={item.id}>
                <td>{formatName(item.name)}</td>
                <td>{formatNumber(item.totalAmountMonth)}</td>
                {item.weeks.map((week, index) => (
                  <td key={item.id + index}>
                    {formatNumber(week?.amountWeek)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total semanal loja</td>
              <td></td>

              {goalsByWeek?.weeksSums?.map((value, index) => (
                <td key={value + index}>{formatNumber(value)}</td>
              ))}
            </tr>
          </tfoot>
        </table>
      </ContainerTable>

      <Footer>
        {/*      <p>Colaborador Extra</p>

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
        </table> */}
      </Footer>
    </Container>
  )
}
