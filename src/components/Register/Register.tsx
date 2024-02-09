import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { register } from '../../store/reducers/userReducer'
import { RootState } from '../../store/store'
import { UserInfo } from '../../types'
import { RegExpTest, ApiUrl } from '../../consts'

import TextInput from '../UI/TextInput/TextInput'
import Button from '../UI/Button/Button'
import './Register.scss'

const USERNAME_MIN_LENGTH = 2
const PASSWORD_MIN_LENGTH = 6

type UserInfoConsts = Uppercase<keyof UserInfo>

const ErrorMessages = {
  REGISTER_ERROR: 'Произошла какая-то ошибка, попробуйте еще раз',
  VALIDATION_ERROR: 'Ошибка валидации',
  USERNAME_FORMAT_ERROR:
    'В имени допускаются только буквы русского и латинского алфавита, цифры и знаки -.,@ ',
  USERNAME_LENGTH_ERROR: `Имя должно состоять как минимум из ${USERNAME_MIN_LENGTH} символов`,
  PASSWORD_FORMAT_ERROR:
    'В пароле допускаются только буквы русского и латинского алфавита, цифры и знаки -/()., ',
  PASSWORD_LENGTH_ERROR: `Пароль должен состоять как минимум из ${PASSWORD_MIN_LENGTH} символов`,
}

const Register = (): JSX.Element => {
  const navigate = useNavigate()
  const [formValue, setFormValue] = useState<UserInfo>({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({ username: null, password: null })

  const { registerError, authStatus } = useAppSelector(
    (state: RootState) => state.userReducer
  )
  const dispatch = useAppDispatch()

  const changeInputValue = (evt: React.SyntheticEvent, name: string) => {
    const value = (evt.target as HTMLInputElement).value
    setErrors({ ...errors, [name]: null })
    setFormValue({ ...formValue, [name]: value })
  }

  const validateValue = (name: keyof UserInfo, value: string) => {
    const nameUppercase = name.toUpperCase() as UserInfoConsts
    let minLength = PASSWORD_MIN_LENGTH
    if (nameUppercase === 'USERNAME') {
      minLength = USERNAME_MIN_LENGTH
    }
    const formatValidity = RegExpTest[nameUppercase].test(value)
    const lengthValidity = minLength ? value.length >= minLength : true

    if (!formatValidity) {
      setErrors({
        ...errors,
        [name]:
          ErrorMessages[
            `${nameUppercase}_FORMAT_ERROR` as keyof typeof ErrorMessages
          ],
      })
    }

    if (!lengthValidity) {
      setErrors({
        ...errors,
        [name]:
          ErrorMessages[
            `${nameUppercase}_LENGTH_ERROR` as keyof typeof ErrorMessages
          ],
      })
    }

    return formatValidity && lengthValidity
  }

  const onFormSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault()
    let isFormValid = true
    for (let key in formValue) {
      isFormValid =
        validateValue(
          key as keyof UserInfo,
          formValue[key as keyof UserInfo]
        ) && isFormValid
    }
    if (isFormValid) {
      dispatch(register(formValue))
    }
  }

  useEffect(() => {
    if (authStatus) {
      navigate(ApiUrl.SQUEEZE)
    }
  }, [authStatus, navigate])

  return (
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form" onSubmit={onFormSubmit}>
        <div className="register__input">
          <TextInput
            placeholder="Имя пользователя"
            value={formValue.username}
            onChange={(evt) => changeInputValue(evt, 'username')}
            required
          />

          {errors.username ? (
            <p className="register__input-error">{errors.username}</p>
          ) : null}
        </div>

        <div className="register__input">
          <TextInput
            placeholder="Пароль"
            type="password"
            value={formValue.password}
            onChange={(evt) => changeInputValue(evt, 'password')}
            required
          />

          {errors.password ? (
            <p className="register__input-error">{errors.password}</p>
          ) : null}
        </div>

        {registerError ? (
          <p className="register__error">{ErrorMessages[registerError]}</p>
        ) : null}
        <div className="register__buttons">
          <Link to={ApiUrl.LOGIN} className="back__button">
            🠔
          </Link>
          <Button type="submit" text="Зарегистрироваться" />
        </div>
      </form>
    </div>
  )
}

export default Register
