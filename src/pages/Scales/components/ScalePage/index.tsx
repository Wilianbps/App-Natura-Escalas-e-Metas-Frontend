import { Switch } from '@mui/material'
import { useEffect, useState } from 'react'

import { PaginationPerDay } from './components/PaginationPerDay'
import { IScale } from './interfaces'
import { dataScales } from './scales'
import {
  Container,
  ContainerTable,
  SelectStyled,
  TableDataInfo,
} from './styles'
import { times } from './times'

export function Scale() {
  const [scales, setScales] = useState({} as IScale)

  async function updateTurn(updatedScales: IScale, rowIndex: number) {
    const index = updatedScales.turns[rowIndex].options.findIndex(
      (option) => option.type === 'T' || option.type === 'R',
    )

    if (index !== -1) {
      if (index >= 0 && index <= 7) {
        updatedScales.turns[rowIndex].turn = 'T1'
        setScales(updatedScales)
      } else if (index >= 8 && index <= 14) {
        updatedScales.turns[rowIndex].turn = 'T2'
        setScales(updatedScales)
      } else if (index >= 15 && index <= 30) {
        updatedScales.turns[rowIndex].turn = 'T3'
        setScales(updatedScales)
      }
    }
  }

  function handleChangeToDoTime(
    event: React.ChangeEvent<HTMLSelectElement>,
    rowIndex: number,
    optionId: number,
  ) {
    const { value } = event.target
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

    updateTurn(updatedScales, rowIndex)

    // Atualizar o estado com as novas escalas
    setScales(updatedScales)
  }

  function handleChangeStatus(
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
  ) {
    const { checked } = event.target

    const updatedStatus = { ...scales }

    updatedStatus.turns[rowIndex].status = checked

    setScales(updatedStatus)
  }

  useEffect(() => {
    setScales(dataScales)
  }, [])

  return (
    <Container>
      <PaginationPerDay />

      <ContainerTable>
        <table>
          <thead>
            <tr>
              <th rowSpan={3}></th>
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
              <th colSpan={17}></th>
              <th colSpan={15} style={{ backgroundColor: '#D58400' }}>
                Noturno
              </th>
            </tr>
            <tr>
              <th>Nome</th>
              <th>Status</th>
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
              <tr key={index}>
                <td>{scale.name}</td>
                <td>
                  <Switch
                    size="small"
                    checked={scale.status}
                    onChange={(event) => handleChangeStatus(event, index)}
                  />
                </td>
                {scale.options.map((option) => (
                  <td key={option.id}>
                    <SelectStyled
                      option={option.type}
                      turn={scale.turn}
                      status={scale.status}
                    >
                      <select
                        disabled={!scale.status}
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
            <tr>
              {Array(32)
                .fill(null)
                .map((_item, index) => (
                  <td key={index}></td>
                ))}
            </tr>

            {scales?.infos?.map((info, indexTr) => (
              <tr key={`scaleInfos_${indexTr}`}>
                <td className="title-info-scale">{info.type}</td>
                <td></td>
                {info?.values?.map((value, indexTd) => (
                  <TableDataInfo
                    key={`value_${indexTd}`}
                    type={info.type}
                    value={value}
                  >
                    <span>{value}</span>
                  </TableDataInfo>
                ))}
              </tr>
            ))}
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </ContainerTable>
    </Container>
  )
}
