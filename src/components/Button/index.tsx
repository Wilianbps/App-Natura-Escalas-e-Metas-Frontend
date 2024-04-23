import { ButtonProps } from './interfaces'
import { ContainerButton } from './styles'

export function Button(props: ButtonProps) {
  const { type, text, color, bgColor, onClick } = props

  return (
    <ContainerButton
      variants={{ color, bgColor }}
      onClick={onClick}
      type={type}
    >
      {text}
    </ContainerButton>
  )
}
