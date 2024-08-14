import { Text } from './styles'

interface ITextInfoProps {
  text: string
  marginTop?: string
  color?: string
}

export function TextInfo(props: ITextInfoProps) {
  const { text, marginTop, color } = props

  return (
    <Text marginTop={marginTop} color={color}>
      {text}
    </Text>
  )
}
