import { scales } from './scales'
import { Container, ContainerTable } from './styles'
import { times } from './times'

export function Scales() {
  function handleChangeToDoTime() {}

  return (
    <Container>
      <header>
        <h1>Escalas</h1>
      </header>

      <ContainerTable>
        <table>
          <thead>
            <tr>
              <th rowSpan={3}></th>
            </tr>
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
              <th colSpan={15} style={{ backgroundColor: '#D58400' }}>
                Noturno
              </th>
            </tr>
            <tr>
              <th></th>
              {times.map((time) => (
                <th key={time[0]} className="shifts">
                  <p>{time[0]}</p>
                  <p>{time[1]}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scales[0]!.map((scale: any, index) => (
              <tr key={index}>
                <td>{scale[0].name}</td>
                {scale[1].options!.map((option: any) => (
                  <td key={index}>
                    <select value={option} onChange={handleChangeToDoTime}>
                      <option value="T">T</option>
                      <option value="R">R</option>
                      <option value="F">F</option>
                    </select>
                  </td>
                ))}
              </tr>
            ))}

            {scales[1]!.map((value: any, index) => (
              <tr key={index}>
                <td>{value[0].type}</td>
                {value[1].values!.map((item: any) => (
                  <td key={index}>
                    <span>{item}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ContainerTable>
    </Container>
  )
}
