import { Link, useLocation } from 'react-router-dom'

import { ApiUrl } from '../../../consts'
import './MainNav.scss'

const MainNav = (): JSX.Element => {
  const path = useLocation().pathname

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          {path === ApiUrl.SQUEEZE ? (
            <span className="main-nav__link main-nav__link--disabled">
              Сжатие ссылок
            </span>
          ) : (
            <Link to={ApiUrl.SQUEEZE} className="main-nav__link">
              Сжатие ссылок
            </Link>
          )}
        </li>

        <li className="main-nav__item">
          {path === ApiUrl.STATISTICS ? (
            <span className="main-nav__link main-nav__link--disabled">
              Статистика
            </span>
          ) : (
            <Link to={ApiUrl.STATISTICS} className="main-nav__link">
              Статистика
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default MainNav
