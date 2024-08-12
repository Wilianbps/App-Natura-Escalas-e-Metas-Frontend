import { Switch } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { IoPersonCircleOutline } from 'react-icons/io5'

import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { useProfiles } from '@/contexts/profiles/ProfilesContext'
import { useScales } from '@/contexts/scale/ScalesContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'

import { CaptionFlowPeople } from '../CaptionFlowPeople'
import { PaginationPerDay } from './components/PaginationPerDay'
import { IScale } from './interfaces'
import {
  Container,
  ContainerTable,
  Footer,
  SelectStyled,
  TableDataInfo,
} from './styles'
import { times } from './times'

export function Scale() {
  const {
    scalesByDate,
    updateSetScalesByDate,
    updateScalesByDate,
    inputFlow,
    dataFinishScale,
  } = useScales()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Array<string>>([])
  const { handleSubmit } = useForm()
  const arraySumsEmployeesByTime = new Array(30).fill(0).map((_, index) => ({
    id: index,
    value: 0,
  }))

  const { cookieProfile } = useProfiles()
  const { monthValue } = useSettings()
  const currentDate = new Date()
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const currentYear = currentDate.getFullYear().toString()
  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  scalesByDate.forEach((item) => {
    item.options.forEach((option, index) => {
      if (option.type === 'T' && item.status === true) {
        arraySumsEmployeesByTime[index].value += 1
      }
    })
  })

  function adjustScale(
    updatedScales: IScale[],
    rowIndex: number,
    value: string,
  ) {
    let foundEmpty = false
    let foundT = false
    let indexfoundEmpty
    let indexfoundT

    for (let i = updatedScales[rowIndex].options.length - 1; i > 0; i--) {
      if (
        updatedScales[rowIndex].options[i].type === 'T' ||
        updatedScales[rowIndex].options[i].type === 'R'
      ) {
        indexfoundEmpty = i - 1
        foundEmpty = true
        break
      }
    }

    if (value === 'T' || value === 'R') {
      if (foundEmpty && indexfoundEmpty !== undefined) {
        for (let i = indexfoundEmpty; i >= 0; i--) {
          if (
            updatedScales[rowIndex].options[i].type === 'T' ||
            updatedScales[rowIndex].options[i].type === 'R'
          ) {
            foundT = true
            indexfoundT = i
          }
        }
      }

      if (
        foundT &&
        indexfoundT !== undefined &&
        indexfoundEmpty !== undefined
      ) {
        for (let i = indexfoundEmpty; i >= indexfoundT; i--) {
          if (
            updatedScales[rowIndex].options[i].type === '' ||
            updatedScales[rowIndex].options[i].type === 'null' ||
            updatedScales[rowIndex].options[i].type === null
          ) {
            updatedScales[rowIndex].options[i].type = 'T'
          }
        }
      }
    }

    if (value === '') {
      if (foundEmpty && indexfoundEmpty !== undefined) {
        for (let i = indexfoundEmpty; i >= 0; i--) {
          if (updatedScales[rowIndex].options[i].type === '') {
            for (let j = 0; i >= j; i--) {
              updatedScales[rowIndex].options[i].type = ''
            }
          }
        }
      }
    }
  }

  async function updateTurn(
    updatedScales: IScale[],
    rowIndex: number,
    value: string,
  ) {
    adjustScale(updatedScales, rowIndex, value)
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
    } else {
      updatedScales[rowIndex].status = false
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

    updateTurn(updatedScales, rowIndex, value)

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

    const nameEmployees: Array<string> = []

    const activeDaysGreaterSeven = updatedStatus.map((item) => {
      let isTrue = false
      if (item.activeDays !== undefined) {
        if (item?.activeDays >= 7 && item.status === true) {
          const name = formatName(item.name)
          nameEmployees.push(name!)
          isTrue = true
        }
      }
      return isTrue
    })

    if (nameEmployees.length > 0 && activeDaysGreaterSeven) {
      setModalMessage(nameEmployees)
    }

    updateSetScalesByDate(updatedStatus)
  }

  function handleUpdateScale() {
    setIsSubmitting(true)

    const nameEmployees: Array<string> = []

    const updatedStatus = [...scalesByDate]

    updatedStatus.forEach((item) => {
      const hasNonNullType = item.options.some(
        (option) => option.type === 'T' || option.type === 'R',
      )
      if (!hasNonNullType) {
        item.status = false
      }
    })

    const activeDaysGreaterSeven = updatedStatus.map((item) => {
      let isTrue = false
      if (item.activeDays !== undefined) {
        if (item?.activeDays >= 7 && item.status === true) {
          const name = formatName(item.name)
          nameEmployees.push(name!)
          isTrue = true
        }
      }
      return isTrue
    })

    if (nameEmployees.length > 0 && activeDaysGreaterSeven) {
      setModalMessage(nameEmployees)
      setIsModalOpen(true)
      setIsSubmitting(false)
    }

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
                <tr key={scale.id}>
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
                          {option.type === 'T' && (
                            <IoPersonCircleOutline size={20} />
                          )}
                          {option.type === 'R' && (
                            <GiForkKnifeSpoon size={20} />
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

              <tr>
                <td className="title-info-scale">Qnt Colab. Ativos</td>
                <td></td>
                {arraySumsEmployeesByTime.map((item) => (
                  <td key={item.id}>{item.value}</td>
                ))}
              </tr>

              <tr>
                <td className="title-info-scale">Atendimento Médio</td>
                <td></td>
                {inputFlow?.map((obj, index) => (
                  <React.Fragment key={index}>
                    {Object.entries(obj).map(([key, value]) => (
                      <TableDataInfo
                        key={`${index}-${key}`}
                        value={Number(value)}
                      >
                        <span>{value}</span>
                      </TableDataInfo>
                    ))}
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </ContainerTable>
        <Footer>
          <CaptionFlowPeople />
          {dataFinishScale[0]?.finished === false &&
            cookieProfile === 'Gerente Loja' &&
            month === currentMonth &&
            year === currentYear && (
              <Button
                type="submit"
                text="Salvar informações do dia"
                color="#000"
                bgColor="#7EC864"
                width="250px"
                isSubmitting={isSubmitting}
              />
            )}
        </Footer>
      </form>

      <Modal
        message={modalMessage}
        open={isModalOpen}
        onHandleClose={() => setIsModalOpen(false)}
      />
    </Container>
  )
}
