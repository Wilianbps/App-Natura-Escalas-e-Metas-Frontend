import { CircularProgress } from '@mui/material'

import { ButtonProps } from './interfaces'
import { ContainerButton } from './styles'

export function Button(props: ButtonProps) {
  const { type, text, color, bgColor, width, onClick, isSubmitting } = props

  return (
    <ContainerButton
      variants={{ color, bgColor, width }}
      onClick={onClick}
      disabled={isSubmitting}
      type={type}
    >
      {isSubmitting === true ? (
        <CircularProgress size={15} style={{ color: '#ffffff' }} />
      ) : (
        text
      )}
    </ContainerButton>
  )
}
