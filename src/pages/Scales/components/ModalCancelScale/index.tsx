import { DialogTitle, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { IoIosAlert } from 'react-icons/io'

import { Button } from '@/components/Button'
import { useScales } from '@/contexts/scale/ScalesContext'

import { Buttons, ContainerModal, Content } from './styles'

interface IModal {
  open: boolean
  onHandleClose: () => void
}

export function ModalCancelScale(props: IModal) {
  const { updateScaleApprovalRequest } = useScales()

  const { open, onHandleClose } = props

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleClose = () => {
    onHandleClose()
  }

  function handleUpdateCanceledRequest() {
    setIsSubmitting(true)
    setTimeout(() => {
      updateScaleApprovalRequest(2)
      setIsSubmitting(false)
      handleClose()
    }, 3000)
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
            marginTop: '20px',
            marginBottom: '10px',
            fontSize: '15px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Caso seja reprovado, não será possível a loja criar a escala e será
          necessário uma nova solicitação.
        </Typography>
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
          Deseja realmente reprovar a solicitação?
        </Typography>
        <Buttons>
          <Button
            type="submit"
            text="Sim"
            color="#000"
            bgColor="#7EC864"
            width="120px"
            isSubmitting={isSubmitting}
            onClick={handleUpdateCanceledRequest}
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
