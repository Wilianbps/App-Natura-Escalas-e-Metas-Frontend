import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import { formatInTimeZone } from 'date-fns-tz'
import { useState } from 'react'
import { CgArrowRight, CgClose } from 'react-icons/cg'

import { TextInfo } from '@/components/TextInfo'
import { useScales } from '@/contexts/scale/ScalesContext'

import { ModalCancelScale } from '../ModalCancelScale'
import {
  ButtonApproval,
  ButtonCanceled,
  Container,
  Table,
  TDStatus,
} from './styles'

export function Approvals() {
  const { dataScaleApprovalRequest, updateScaleApprovalRequest } = useScales()
  const [isSubmittingApprovalRequest, setIsSubmittingApprovalRequest] =
    useState(false)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  function handleUpdateApprovalRequest() {
    setIsSubmittingApprovalRequest(true)
    setTimeout(() => {
      updateScaleApprovalRequest(1)
      setIsSubmittingApprovalRequest(false)
    }, 3000)
  }

  function handleOpenModalToCancelScale() {
    setIsModalOpen(true)
  }

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>descrição</th>
            <th>responsável</th>
            <th>cod. loja</th>
            <th>data solicitação</th>
            <th>data aprovação</th>
            <th>status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataScaleApprovalRequest?.map((item, index) => (
            <tr key={item.approvalDate + index.toString()}>
              <td width={250}>{item.description}</td>
              <td width={200}>{item.responsible}</td>
              <td width={150}>{item.branch}</td>
              <td width={180}>
                {formatInTimeZone(item.requestDate, 'UTC', 'dd/MM/yyyy')}
              </td>
              <td width={180}>
                {item.approvalDate &&
                  formatInTimeZone(item.approvalDate, 'UTC', 'dd/MM/yyyy')}
              </td>
              <TDStatus status={item.status} width={150}>
                <section>
                  <span></span>
                  <p>{item.status === 0 && 'pendente'}</p>
                  <p>{item.status === 1 && 'aprovado'}</p>
                  <p>{item.status === 2 && 'cancelado'}</p>
                </section>
              </TDStatus>
              <td width={150}>
                {dataScaleApprovalRequest[0]?.status === 0 && (
                  <ButtonApproval onClick={handleUpdateApprovalRequest}>
                    {isSubmittingApprovalRequest === true ? (
                      <CircularProgress
                        size={15}
                        style={{ color: '#449428' }}
                      />
                    ) : (
                      <>
                        <CgArrowRight size={20} /> <span>Aprovar</span>
                      </>
                    )}
                  </ButtonApproval>
                )}
                {dataScaleApprovalRequest[0]?.status === 1 && (
                  <TextInfo text="aprovado" color="#449428" />
                )}
              </td>
              <td width={150}>
                {dataScaleApprovalRequest[0]?.status === 0 && (
                  <ButtonCanceled onClick={handleOpenModalToCancelScale}>
                    <>
                      <CgClose />
                      <span>reprovar</span>
                    </>
                  </ButtonCanceled>
                )}

                {dataScaleApprovalRequest[0]?.status === 2 && (
                  <TextInfo text="cancelado" color="red" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalCancelScale
        open={isModalOpen}
        onHandleClose={() => setIsModalOpen(false)}
      />
    </Container>
  )
}
