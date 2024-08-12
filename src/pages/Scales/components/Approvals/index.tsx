import { formatInTimeZone } from 'date-fns-tz'
import { CgArrowRight, CgClose } from 'react-icons/cg'

import { useScales } from '@/contexts/scale/ScalesContext'

import {
  ButtonApproval,
  ButtonCanceled,
  Container,
  Table,
  TDStatus,
} from './styles'

export function Approvals() {
  const { dataScaleApprovalRequest } = useScales()

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>descrição</th>
            <th>responsável</th>
            <th>loja</th>
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
              <td width={250}>{item.responsible}</td>
              <td width={150}>{item.branch}</td>
              <td width={200}>
                {formatInTimeZone(item.requestDate, 'UTC', 'dd/MM/yyyy')}
              </td>
              <td width={200}>
                {item.approvalDate &&
                  formatInTimeZone(item.approvalDate, 'UTC', 'dd/MM/yyyy')}
              </td>
              <TDStatus status={0} width={150}>
                <section>
                  <span></span>
                  <p>{item.status === 0 && 'pendente'}</p>
                  <p>{item.status === 1 && 'aprovado'}</p>
                  <p>{item.status === 2 && 'cancelado'}</p>
                </section>
              </TDStatus>
              <td>
                <ButtonApproval>
                  <CgArrowRight size={20} />
                  Aprovar
                </ButtonApproval>
              </td>
              <td>
                <ButtonCanceled>
                  <CgClose />
                  cancelar
                </ButtonCanceled>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
