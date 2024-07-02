import { Text } from './styles'

interface ITextInfoProps {
  text: string
  marginTop: string
}

export function TextInfo(props: ITextInfoProps) {
  const { text, marginTop } = props

  return <Text marginTop={marginTop}>{text}</Text>
}
