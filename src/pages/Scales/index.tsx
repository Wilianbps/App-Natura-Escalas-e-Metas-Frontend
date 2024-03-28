import { Container, ContainerTable } from './styles'
import { times } from './times'

export function Scales() {
  console.log(times[0][1])
  return (
    <Container>
      <header>
        <h1>Escalas</h1>
      </header>

      <ContainerTable>
        <table>
          <thead>
            <tr>
              <th colSpan={15} style={{ backgroundColor: '#F8E32B' }}>
                Matutino
              </th>
            </tr>
            <tr>
              <th colSpan={8}></th>
              <th colSpan={15} style={{ backgroundColor: '#FFB84D' }}>
                Vespertino
              </th>
            </tr>
            <tr>
              <th colSpan={16}></th>
              <th colSpan={14} style={{ backgroundColor: '#D58400' }}>
                Noturno
              </th>
            </tr>
            <tr>
              {times.map((time) => (
                <td key={time[0]}>
                  <p>{time[0]}</p>
                  <p>{time[1]}</p>
                </td>
              ))}
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </ContainerTable>
    </Container>
  )
}
