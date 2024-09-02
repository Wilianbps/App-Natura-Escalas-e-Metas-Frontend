import { useEffect, useState } from 'react'
import { IoIosAlert } from 'react-icons/io'

import { useScales } from '@/contexts/scale/ScalesContext'

import { ModalScaleApprovalRequest } from '../ModalScaleApprovalRequest'
import { Container } from './styles'

interface InfoTextScaleDeadlineProps {
  text: string
}

export function InfoTextScaleDeadline(props: InfoTextScaleDeadlineProps) {
  const { text } = props
  const { dataScaleApprovalRequest } = useScales()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [hasLoaded, setHasLoaded] = useState<boolean>(false)

  useEffect(() => {
    setHasLoaded(true)
  }, [dataScaleApprovalRequest])

  if (!hasLoaded) {
    return null
  }

  return (
    <Container>
      {dataScaleApprovalRequest.length === 0 ||
      dataScaleApprovalRequest[dataScaleApprovalRequest?.length - 1]?.status !==
        0 ? (
        <>
          <IoIosAlert size={40} color="#fff" fill="#FF6C13" />
          <p>
            {text} <span onClick={() => setIsModalOpen(true)}>Clique aqui</span>{' '}
            para solicitar um novo prazo.
          </p>

          <ModalScaleApprovalRequest
            open={isModalOpen}
            onHandleClose={() => setIsModalOpen(false)}
          />
        </>
      ) : (
        <>
          <IoIosAlert size={40} color="#fff" fill="#FF6C13" />
          <p>Solicitação de aprovação já enviada. Favor aguardar liberação!</p>
        </>
      )}
    </Container>
  )
}
