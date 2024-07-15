import { useState } from 'react'

import { useGoals } from '@/contexts/goals/GoalsContext'
import { useSettings } from '@/contexts/setting/SettingContext'

import { PaginationByFortnight } from './components/PaginationByFortnight'
import { Container, ContainerTable, Footer } from './styles'
import { splitDaysOfMonthIntoTwoParts } from './utils/splitDaysOfMonthIntoTwoParts'

export function GoalByDay() {
  const { monthValue } = useSettings()
  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]
  const { goals } = useGoals()

  const daysOfMonth = splitDaysOfMonthIntoTwoParts(Number(month), Number(year))

  const [page, setPage] = useState(0)

  const totalPages = goals.length

  function handleNextPage() {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
  }

  function handlePreviousPage() {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  return (
    <Container>
      <PaginationByFortnight
        currentPage={page}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
      <ContainerTable>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              {daysOfMonth[page].map((day) => (
                <th key={day.daymonth}>{day.daymonth}</th>
              ))}
            </tr>
            <tr>
              <th>Colaboladores</th>
              <th>Total Mês</th>
              {daysOfMonth[page].map((day) => (
                <th key={day.daymonth}>{day.dayweek}</th>
              ))}
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
              <td>R$36.000,00</td>
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
        {/*  <p>Colaborador Extra</p>

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
        </table> */}
      </Footer>
    </Container>
  )
}
