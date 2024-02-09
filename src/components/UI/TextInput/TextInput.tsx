import './TextInput.scss'

interface TextInputProps {
  type?: 'text' | 'password'
  value?: string
  placeholder?: string
  onChange: (evt: React.SyntheticEvent) => void
  required?: boolean
}

const TextInput = ({
  type = 'text',
  value,
  placeholder = '',
  onChange,
  required = false,
}: TextInputProps): JSX.Element => {
  return (
    <input
      className="text-input"
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
    />
  )
}

export default TextInput
