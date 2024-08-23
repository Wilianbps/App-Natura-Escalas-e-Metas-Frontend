import {
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { CgClose } from 'react-icons/cg'
import { IoIosAlert } from 'react-icons/io'

import { ContainerModal } from './styles'

interface IModalValidateEmployeeShifts {
  message: Array<string>
  open: boolean
  onHandleClose: () => void
}

export function ModalValidateEmployeeShifts(
  props: IModalValidateEmployeeShifts,
) {
  const { message, open, onHandleClose } = props

  const handleClose = () => {
    onHandleClose()
  }

  return (
    <ContainerModal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{ borderRadius: '20px' }} // Definindo o border-radius como 20px
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
      >
        <IoIosAlert size={20} color="#C60000" />
        Alerta de Preenchimento da escala
      </DialogTitle>
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
      <DialogContent dividers>
        <Typography
          gutterBottom
          sx={{ m: 0, p: 2, fontSize: '13px', fontWeight: 'bold' }}
        >
          <ul>
            {message.map((name, index) => (
              <li key={index}>{name.trim()}</li>
            ))}
          </ul>
        </Typography>
      </DialogContent>
    </ContainerModal>
  )
}
