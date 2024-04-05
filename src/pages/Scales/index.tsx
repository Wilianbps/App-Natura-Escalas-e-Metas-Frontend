import { useEffect, useState } from 'react'

import { IScale } from './interfaces'
import { dataScales } from './scales'
import { Container, ContainerTable, SelectStyled } from './styles'
import { times } from './times'

export function Scales() {
  const [scales, setScales] = useState({} as IScale)

  function handleChangeToDoTime(
    event: React.ChangeEvent<HTMLSelectElement>,
    rowIndex: number,
    optionId: number,
  ) {
    const { value } = event.target

    console.log('event', value)
    console.log('index', rowIndex)
    console.log('id', optionId)

    // Copiar o estado atual das escalas
    const updatedScales = { ...scales }

    // Encontrar a opção correta para atualizar
    const selectedOption = updatedScales.turns[rowIndex].options.find(
      (option) => option.id === optionId,
    )

    // Atualizar o tipo da opção selecionada
    if (selectedOption) {
      selectedOption.type = value
    }

    // Atualizar o estado com as novas escalas
    setScales(updatedScales)
  }

  console.log('scales', scales)

  useEffect(() => {
    setScales(dataScales)
  }, [])

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
            {scales?.turns?.map((scale, index) => (
              /*     <tr key={`${index}${scale.id}`}> */
              <tr key={index}>
                <td>{scale.name}</td>
                {scale.options.map((option) => (
                  <td key={option.id}>
                    <SelectStyled variant={option.type}>
                      <select
                        value={option.type}
                        onChange={(event) =>
                          handleChangeToDoTime(event, index, option.id)
                        }
                      >
                        <option value=""></option>
                        <option value="T">T</option>
                        <option value="R">R</option>
                      </select>

                      <div className="styled-select">
                        {option.type === 'T' ? 'T' : option.type === 'R' && 'R'}
                      </div>
                    </SelectStyled>
                  </td>
                ))}
              </tr>
            ))}

            {scales?.values?.map((value, index) => (
              <tr key={`scaleValue_${index}`}>
                <td>{value.type}</td>
                {value.value!.map((item, index) => (
                  <td key={`value_${index}`}>
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
