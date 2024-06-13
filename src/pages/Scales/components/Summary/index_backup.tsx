import { useScales } from '@/contexts/scale/ScalesContext'

import { Container, ContainerTable, TDShift, TRShiftMorning } from './styles'

export function Summary() {
  const { scaleSummary } = useScales()

  console.log('scaleSummary teste', scaleSummary)

  return (
    <Container>
      <ContainerTable>
        <table>
          <thead>
            <tr>
              <th>Nome Colab.</th>
              <th>HT-M</th>
              <th>DT</th>
              <th>
                <p>Segunda</p>
                <p>01</p>
              </th>
              <th>
                <p>Terça</p>
                <p>02</p>
              </th>
              <th>
                <p>Quarta</p>
                <p>03</p>
              </th>
              <th>
                <p>Quinta</p>
                <p>04</p>
              </th>
              <th>
                <p>Sexta</p>
                <p>05</p>
              </th>
              <th>
                <p>Sábado</p>
                <p>06</p>
              </th>
              <th>
                <p>Domingo</p>
                <p>07</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {scaleSummary[0]?.map((item) => (
              <>
                <TRShiftMorning>
                  <td rowSpan={2} className="td-name">
                    {item.name}
                  </td>
                  <td rowSpan={2}>27</td>
                  <td rowSpan={2}></td>
                  <td>08:00 - 15:30</td>
                  <td>08:00 - 15:30</td>
                  <td>08:00 - 15:30</td>
                  <td>08:00 - 15:30</td>
                  <td>08:00 - 15:30</td>
                  <td>08:00 - 15:30</td>
                  <td>08:00 - 15:30</td>
                </TRShiftMorning>
                <TRShiftMorning>
                  <TDShift value="T" shift={item.dayOfWeek === 1 ? 'T1' : ''}>
                    <div>{item.dayOfWeek === 1 && 'T'}</div>
                  </TDShift>
                  <TDShift value="T" shift={item.dayOfWeek === 2 ? 'T1' : ''}>
                    <div>{item.dayOfWeek === 2 && 'T'}</div>
                  </TDShift>
                  <TDShift value="T" shift={item.dayOfWeek === 3 ? 'T1' : ''}>
                    <div>{item.dayOfWeek === 3 && 'T'}</div>
                  </TDShift>
                  <TDShift value="F" shift={item.dayOfWeek === 4 ? 'T1' : ''}>
                    <div>{item.dayOfWeek === 4 && 'T'}</div>
                  </TDShift>
                  <TDShift value="T" shift={item.dayOfWeek === 5 ? 'T1' : ''}>
                    <div>{item.dayOfWeek === 5 && 'T'}</div>
                  </TDShift>
                  <TDShift value="T" shift={item.dayOfWeek === 6 ? 'T1' : ''}>
                    <div>{item.dayOfWeek === 6 && 'T'}</div>
                  </TDShift>
                  <TDShift value="T" shift={item.dayOfWeek === 7 ? 'T1' : ''}>
                    <div>{item.dayOfWeek === 7 && 'T'}</div>
                  </TDShift>
                </TRShiftMorning>
              </>
            ))}
          </tbody>
        </table>
      </ContainerTable>
    </Container>
  )
}
