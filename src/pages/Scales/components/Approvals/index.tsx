import { CgArrowRight, CgClose } from 'react-icons/cg'

import {
  ButtonApproval,
  ButtonCanceled,
  Container,
  Table,
  TDStatus,
} from './styles'

export function Approvals() {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>descrição</th>
            <th>responsável</th>
            <th>loja</th>
            <th>data</th>
            <th>status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width={250}>solicitação de aprovação</td>
            <td width={250}>Marco Silva</td>
            <td width={150}>Iguatemi 08</td>
            <td width={150}>17/07/2024</td>
            <TDStatus status={1} width={150}>
              <section>
                <span></span>
                <p>pendente</p>
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
          <tr>
            <td width={250}>solicitação de aprovação</td>
            <td width={250}>Marco Silva</td>
            <td width={150}>Iguatemi 08</td>
            <td width={150}>17/07/2024</td>
            <TDStatus status={2} width={150}>
              <section>
                <span></span>
                <p>aprovado</p>
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
          <tr>
            <td width={250}>solicitação de aprovação</td>
            <td width={250}>Marco Silva</td>
            <td width={150}>Iguatemi 08</td>
            <td width={150}>17/07/2024</td>
            <TDStatus status={3} width={150}>
              <section>
                <span></span>
                <p>cancelado</p>
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
        </tbody>
      </Table>
    </Container>
  )
}
