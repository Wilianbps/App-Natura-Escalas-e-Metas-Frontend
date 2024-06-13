import {
  Container,
  ContainerTable,
  TDShift,
  TRShiftAfternoon,
  TRShiftMorning,
  TRShiftNight,
} from './styles'

export function Summary() {
  return (
    <Container>
      <ContainerTable>
        <table>
          <thead>
            <tr>
              <th>Turno</th>
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
            {/* Início Turno Manha */}
            <TRShiftMorning>
              <td rowSpan={4} className="td-turn">
                <span className="border-left"></span>
                <p>Matutino</p>
                <p>07:00 - 14:30</p>
                <span className="border-right"></span>
              </td>
              <td rowSpan={2} className="td-name">
                José Maria
              </td>
              <td rowSpan={2}>27</td>
              <td rowSpan={2}></td>
              <td>08:00 - 15:30</td>
              <td>08:00 - 15:30</td>
              <td>08:00 - 15:30</td>
              <td></td>
              <td>08:00 - 15:30</td>
              <td>08:00 - 15:30</td>
              <td>08:00 - 15:30</td>
            </TRShiftMorning>
            <TRShiftMorning>
              <TDShift value="T" shift="T1">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T1">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T1">
                <div>T</div>
              </TDShift>
              <TDShift value="F" shift="T1">
                <div>F</div>
              </TDShift>
              <TDShift value="T" shift="T1">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T1">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T1">
                <div>T</div>
              </TDShift>
            </TRShiftMorning>
            <TRShiftMorning>
              <td rowSpan={2} className="td-name">
                Mario Andrade
              </td>
              <td rowSpan={2}>27</td>
              <td rowSpan={2}></td>
              <td>08:00 - 15:30</td>
              <td>08:00 - 15:30</td>
              <td></td>
              <td>08:00 - 15:30</td>
              <td>08:00 - 15:30</td>
              <td></td>
              <td></td>
            </TRShiftMorning>
            <TRShiftMorning>
              <TDShift value="T" shift="T1">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T1">
                <div>T</div>
              </TDShift>
              <TDShift value="F" shift="T1">
                <div>F</div>
              </TDShift>
              <TDShift value="T" shift="T1">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T1">
                <div>T</div>
              </TDShift>
              <TDShift value="F" shift="T1">
                <div>F</div>
              </TDShift>
              <TDShift value="F" shift="T1">
                <div>F</div>
              </TDShift>
            </TRShiftMorning>

            {/* Fim Turno Manha */}

            {/* Início Turno Tarde */}

            <TRShiftAfternoon>
              <td rowSpan={4} className="td-turn">
                <span className="border-left"></span>
                <p>Vespertino</p>
                <p>11:00 - 18:30</p>
                <span className="border-right"></span>
              </td>
              <td rowSpan={2} className="td-name">
                Maria Soares
              </td>
              <td rowSpan={2}>27</td>
              <td rowSpan={2}></td>
              <td>11:00 - 18:30</td>
              <td>11:00 - 18:30</td>
              <td>11:00 - 18:30</td>
              <td>11:00 - 18:30</td>
              <td>11:00 - 18:30</td>
              <td>11:00 - 18:30</td>
              <td>11:00 - 18:30</td>
            </TRShiftAfternoon>
            <TRShiftAfternoon>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
            </TRShiftAfternoon>
            <TRShiftAfternoon>
              <td rowSpan={2} className="td-name">
                Ana Vieira
              </td>
              <td rowSpan={2}>27</td>
              <td rowSpan={2}></td>
              <td></td>
              <td>11:00 - 18:30</td>
              <td>11:00 - 18:30</td>
              <td>11:00 - 18:30</td>
              <td>11:00 - 18:30</td>
              <td>11:00 - 18:30</td>
              <td>11:00 - 18:30</td>
            </TRShiftAfternoon>
            <TRShiftAfternoon>
              <TDShift value="F" shift="T2">
                <div>F</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T2">
                <div>T</div>
              </TDShift>
            </TRShiftAfternoon>

            {/* Fim Turno Tarde */}

            {/* Início Turno Noite */}
            <TRShiftNight>
              <td rowSpan={4} className="td-turn">
                <span className="border-left"></span>
                <p>Noturno</p>
                <p>15:00 - 22:00</p>
                <span className="border-right"></span>
              </td>
              <td rowSpan={2} className="td-name">
                José Maria
              </td>
              <td rowSpan={2}>27</td>
              <td rowSpan={2}></td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
            </TRShiftNight>
            <TRShiftNight>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
            </TRShiftNight>
            <TRShiftNight>
              <td rowSpan={2} className="td-name">
                Mario Andrade
              </td>
              <td rowSpan={2}>27</td>
              <td rowSpan={2}></td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
              <td>14:30 - 22:00</td>
            </TRShiftNight>
            <TRShiftNight>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
              <TDShift value="F" shift="T3">
                <div>F</div>
              </TDShift>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
              <TDShift value="T" shift="T3">
                <div>T</div>
              </TDShift>
            </TRShiftNight>

            {/* Fim Turno Noite */}
          </tbody>
        </table>
      </ContainerTable>
    </Container>
  )
}
