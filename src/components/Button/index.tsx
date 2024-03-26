import { ButtonProps } from './interfaces'
import { ContainerButton } from './styles'

export function Button(props: ButtonProps) {
  const { text, color, bgColor } = props

  return <ContainerButton variants={{ color, bgColor }}>{text}</ContainerButton>
}
