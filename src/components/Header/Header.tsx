import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { RootState } from '../../store/store'
import { exitProfile } from '../../store/reducers/userReducer'
import { exitProfileData } from '../../store/reducers/dataReducer'

import MainNav from './MainNav/MainNav'
import './Header.scss'
import { ApiUrl } from '../../consts'

const Header = (): JSX.Element => {
  const username = useAppSelector(
    (state: RootState) => state.userReducer.username
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onExitButtonClick = () => {
    dispatch(exitProfile())
    dispatch(exitProfileData())
    navigate(ApiUrl.LOGIN)
  }

  return (
    <header className="header">
      <div className="header__nav">
        <MainNav />
      </div>

      <div className="header__user-menu">
        <p className="header__username">{username}</p>
        <button className="header__exit-button" onClick={onExitButtonClick}>
          Выйти
        </button>
      </div>
    </header>
  )
}

export default Header
