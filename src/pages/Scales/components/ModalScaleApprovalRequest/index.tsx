import { DialogTitle, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { IoIosAlert } from 'react-icons/io'

import { Button } from '@/components/Button'
import { useScales } from '@/contexts/scale/ScalesContext'

import { ContainerModal, Content } from './styles'

interface IModal {
  open: boolean
  onHandleClose: () => void
}

export function ModalScaleApprovalRequest(props: IModal) {
  const {
    postScaleApprovalRequest,
    dataScaleApprovalRequest,
    fetchGetScaleApprovalByDate,
  } = useScales()

  const { open, onHandleClose } = props

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleClose = () => {
    onHandleClose()
  }

  useEffect(() => {
    if (isSubmitting) fetchGetScaleApprovalByDate()
  }, [dataScaleApprovalRequest])

  function handleScaleApprovalRequest() {
    setIsSubmitting(true)

    setTimeout(async () => {
      postScaleApprovalRequest()
      setIsSubmitting(false)
      handleClose()
    }, 3000)
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
            marginBottom: 0,
            fontSize: '13px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Prazo para configuração da escala expirado!
        </Typography>
        <Typography
          gutterBottom
          sx={{
            marginBottom: '15px',
            p: 2,
            fontSize: '13px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Solicite liberação ao supervisor.
        </Typography>

        <Button
          type="submit"
          text="Solicitar liberação"
          color="#000"
          bgColor="#7EC864"
          width="220px"
          isSubmitting={isSubmitting}
          onClick={handleScaleApprovalRequest}
        />
      </Content>
    </ContainerModal>
  )
}
