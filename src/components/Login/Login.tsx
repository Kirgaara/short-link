import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ApiUrl } from '../../consts'
import { login } from '../../store/reducers/userReducer'
import { RootState } from '../../store/store'

import TextInput from '../UI/TextInput/TextInput'
import Button from '../UI/Button/Button'
import './Login.scss'

const ErrorMessages = {
  LOGIN_ERROR: 'Произошла какая-то ошибка, попробуйте еще раз',
  LOGIN_MISMATCH: 'Логин и пароль несоответствуют друг другу',
  VALIDATION_ERROR: 'Ошибка валидации',
}

const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const [formValue, setFormValue] = useState({ username: '', password: '' })

  const { loginError, authStatus } = useAppSelector(
    (state: RootState) => state.userReducer
  )
  const dispatch = useAppDispatch()

  const changeInputValue = (evt: React.SyntheticEvent, name: string) => {
    const value = (evt.target as HTMLInputElement).value
    setFormValue({ ...formValue, [name]: value })
  }

  const onFormSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault()
    dispatch(login(formValue))
  }

  useEffect(() => {
    if (authStatus) {
      navigate(ApiUrl.SQUEEZE)
    }
  }, [authStatus, navigate])

  return (
    <div className="login">
      <h1 className="login__title">Авторизация</h1>
      <form className="login__form" onSubmit={onFormSubmit}>
        <TextInput
          placeholder="Имя пользователя"
          value={formValue.username}
          onChange={(evt) => changeInputValue(evt, 'username')}
          required
        />
        <TextInput
          placeholder="Пароль"
          type="password"
          value={formValue.password}
          onChange={(evt) => changeInputValue(evt, 'password')}
          required
        />

        {loginError ? (
          <p className="login__error">{ErrorMessages[loginError]}</p>
        ) : null}

        <div className="login__buttons">
          <Button type="submit" text="Войти" />
          <Link to={ApiUrl.REGISTER} className="login__button">
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
