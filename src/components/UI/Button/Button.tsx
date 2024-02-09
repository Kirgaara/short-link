import './Button.scss'

interface ButtonProps {
  type?: 'button' | 'reset' | 'submit'
  text: string
  stretch?: boolean
  onClick?: () => void
}

const Button = ({
  type = 'button',
  text,
  stretch = false,
  onClick = undefined,
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`button
    ${stretch ? ' button--stretch' : ''}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
