export interface ButtonProps {
  type?: 'button' | 'submit'
  text: string
  color: string
  bgColor: string
  width?: string
  isSubmitting?: boolean
  onClick?: () => void
}
