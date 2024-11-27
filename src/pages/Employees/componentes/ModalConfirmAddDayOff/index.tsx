import { DialogTitle, IconButton, Typography } from '@mui/material'
import { intlFormat } from 'date-fns'
import { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { IoIosAlert } from 'react-icons/io'

import { Button } from '@/components/Button'
import { formatName } from '@/libs/formatName'

import { Buttons, ContainerModal, Content } from './styles'

interface IEmployee {
  idSeler?: number
  idDayOff?: number
  storeCode?: string
  userLogin?: string
  name?: string
  cpf?: string | null
  newUser?: boolean | null
  status?: boolean
  office?: string
  idShift?: number
  shift: string | null
  startTime?: string
  finishTime?: string
  startVacation: string | null
  finishVacation: string | null
  arrayDaysOff?: {
    id?: number
    date: string | null
    type?: string
  }[]
  arrayVacation?: {
    id?: number
    startVacation: string | null
    finishVacation: string | null
    type?: string
  }[]
  flowScale?: string
}

interface ModalDeleteEmployeeProps {
  open: boolean
  onHandleClose: () => void
  employees: IEmployee[]
  onConfirm: () => void
  dayOff: Date | null
}

export function ModalConfirmAddDayOff(props: ModalDeleteEmployeeProps) {
  const { employees, open, onHandleClose, onConfirm, dayOff } = props

  const formattedDayOf = intlFormat(new Date(dayOff!), { locale: 'pt-BR' })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleClose = () => {
    onHandleClose()
  }

  function handleAddDayOff() {
    setIsSubmitting(true)

    setTimeout(() => {
      onConfirm()
      setIsSubmitting(false)
      handleClose()
    }, 1000)
  }

  return (
    <ContainerModal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{ borderRadius: '20px' }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
        id="customized-dialog-title"
      ></DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CgClose size={17} />
      </IconButton>
      <Content>
        <IoIosAlert size={60} color="#fff" fill="#FF6C13" />

        <Typography
          gutterBottom
          sx={{
            marginTop: '10px',
            marginBottom: '20px',
            fontSize: '15px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Funcionários/as abaixo já estão com folga no dia {formattedDayOf}:
        </Typography>

        <Typography
          gutterBottom
          sx={{
            marginTop: '10px',
            marginBottom: '20px',
            fontSize: '15px',
            textAlign: 'left',
          }}
        >
          <ul>
            {employees.map((employee) => (
              <li key={employee.idSeler}>{formatName(employee.name)}</li>
            ))}
          </ul>
        </Typography>

        <Typography
          gutterBottom
          sx={{
            marginTop: '30px',
            marginBottom: '20px',
            fontSize: '15px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Deseja realmente cadastrar folga para o funcionário/a?
        </Typography>
        <Buttons>
          <Button
            type="submit"
            text="Sim"
            color="#000"
            bgColor="#7EC864"
            width="120px"
            isSubmitting={isSubmitting}
            onClick={handleAddDayOff}
          />
          <Button
            type="button"
            text="Não"
            color="#000"
            bgColor="#FF6C13"
            width="120px"
            onClick={onHandleClose}
          />
        </Buttons>
      </Content>
    </ContainerModal>
  )
}
