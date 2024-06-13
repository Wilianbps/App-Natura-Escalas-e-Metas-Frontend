import { useScales } from '@/contexts/scale/ScalesContext'
import { formatName } from '@/libs/formatName'

import { Container, ContainerTable, TDShift, TRShiftMorning } from './styles'

export function Summary() {
  const { scaleSummary } = useScales()

  const currentMonth = new Date().getMonth() + 1
  console.log('currentMonth', currentMonth)

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
                <p></p>
              </th>
              <th>
                <p>Terça</p>
                <p></p>
              </th>
              <th>
                <p>Quarta</p>
                <p></p>
              </th>
              <th>
                <p>Quinta</p>
                <p></p>
              </th>
              <th>
                <p>Sexta</p>
                <p></p>
              </th>
              <th>
                <p>Sábado</p>
                <p></p>
              </th>
              <th>
                <p>Domingo</p>
                <p></p>
              </th>
            </tr>
          </thead>
          <tbody>
            {scaleSummary[1]?.map((collaborator) => (
              <>
                <TRShiftMorning>
                  <td rowSpan={2} className="td-name">
                    {formatName(collaborator.name)}
                  </td>
                  <td rowSpan={2}>27</td>
                  <td rowSpan={2}></td>

                  {Array.from({ length: 7 }).map((_, index) => {
                    const day = collaborator.days.find(
                      (day) => day.dayOfWeek === index + 1,
                    )
                    return (
                      <td key={index} width={160}>
                        {day?.status === 1
                          ? `${day.startTime} - ${day.endTime}`
                          : ''}
                      </td>
                    )
                  })}
                </TRShiftMorning>
                <TRShiftMorning>
                  {Array.from({ length: 7 }).map((_, index) => {
                    const day = collaborator.days.find(
                      (day) => day.dayOfWeek === index + 1,
                    )
                    return (
                      <TDShift
                        key={index}
                        value={
                          day?.status === 1 ? 'T' : day?.status === 0 ? 'F' : ''
                        }
                        shift={day?.status === 1 ? 'T1' : ''}
                      >
                        {!day?.month ? (
                          <div></div>
                        ) : (
                          <div>{day?.status === 1 ? 'T' : 'F'}</div>
                        )}
                      </TDShift>
                    )
                  })}
                </TRShiftMorning>
              </>
            ))}
          </tbody>
        </table>
      </ContainerTable>
    </Container>
  )
}
