import { Switch } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { IoPersonCircleOutline } from 'react-icons/io5'

import { Button } from '@/components/Button'
import { useScales } from '@/contexts/scale/ScalesContext'
import { formatName } from '@/libs/formatName'

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
  const { scalesByDate, updateSetScalesByDate, updateScalesByDate } =
    useScales()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { handleSubmit } = useForm()

  function adjustScale(updatedScales: IScale[], rowIndex: number) {
    let foundEmpty = false
    let index

    for (let i = updatedScales[rowIndex].options.length - 1; i > 0; i--) {
      if (
        updatedScales[rowIndex].options[i].type === 'T' ||
        updatedScales[rowIndex].options[i].type === 'R'
      ) {
        index = i - 1
        foundEmpty = true
        break
      }
    }

    if (foundEmpty && index !== undefined) {
      console.log(index)
      for (let i = index; i >= 0; i--) {
        if (updatedScales[rowIndex].options[i].type === '') {
          for (let j = 0; i >= j; i--) {
            updatedScales[rowIndex].options[i].type = ''
          }
          break
        }
      }
    }
  }

  async function updateTurn(updatedScales: IScale[], rowIndex: number) {
    adjustScale(updatedScales, rowIndex)
    const index = updatedScales[rowIndex].options.findIndex(
      (option) => option.type === 'T' || option.type === 'R',
    )

    if (index !== -1) {
      if (index >= 0 && index <= 7) {
        updatedScales[rowIndex].turn = 'T1'
        updateSetScalesByDate(updatedScales)
      } else if (index >= 8 && index <= 14) {
        updatedScales[rowIndex].turn = 'T2'
        updateSetScalesByDate(updatedScales)
      } else if (index >= 15 && index <= 30) {
        updatedScales[rowIndex].turn = 'T3'
        updateSetScalesByDate(updatedScales)
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
    const updatedScales = [...scalesByDate]

    // Encontrar a opção correta para atualizar
    const selectedOption = updatedScales[rowIndex].options.find(
      (item) => item.id === optionId,
    )

    // Atualizar o tipo da opção selecionada
    if (selectedOption) {
      selectedOption.type = value
    }

    /*     const adjustOptionScaleByRowIndex = adjustScale(updatedScales, rowIndex) */

    updateTurn(updatedScales, rowIndex)

    // Atualizar o estado com as novas escalas
    updateSetScalesByDate(updatedScales)
  }

  function handleChangeStatus(
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
  ) {
    const { checked } = event.target

    const updatedStatus = [...scalesByDate]

    updatedStatus[rowIndex].status = checked

    updateSetScalesByDate(updatedStatus)
  }

  function handleUpdateScale() {
    setIsSubmitting(true)

    setTimeout(() => {
      updateScalesByDate(scalesByDate)
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <Container>
      <PaginationPerDay />

      <form onSubmit={handleSubmit(handleUpdateScale)}>
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
              {scalesByDate?.map((scale, index) => (
                <tr key={index}>
                  <td>{formatName(scale.name)}</td>
                  <td>
                    <Switch
                      size="small"
                      checked={scale.status}
                      onChange={(event) => handleChangeStatus(event, index)}
                    />
                  </td>
                  {scale?.options?.map((option) => (
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
                          {option.type === 'T' ? (
                            <IoPersonCircleOutline size={20} />
                          ) : (
                            option.type === 'R' && (
                              <GiForkKnifeSpoon size={20} />
                            )
                          )}
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

              {dataScales?.infos?.map((info, indexTr) => (
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
        <footer>
          <Button
            type="submit"
            text="Salvar informações do dia"
            color="#000"
            bgColor="#7EC864"
            width="250px"
            isSubmitting={isSubmitting}
          />
        </footer>
      </form>
    </Container>
  )
}
