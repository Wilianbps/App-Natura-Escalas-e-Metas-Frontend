import { SelectBasic } from '../Select'
import { ContainerHeader } from './styles'

export function Header() {
  return (
    <ContainerHeader>
      <SelectBasic minWidth={120} heightSelect="30px" fontSize="13px" />
      <input type="date" />
    </ContainerHeader>
  )
}
