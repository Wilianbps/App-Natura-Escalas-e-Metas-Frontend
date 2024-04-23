export interface ButtonProps {
  type?: 'button' | 'submit'
  text: string
  color: string
  bgColor: string
  onClick?: () => void
}
