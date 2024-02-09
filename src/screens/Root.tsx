import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom'

import { ApiUrl } from '../consts'

import ScreensLogin from './Login/Login'
import ScreensRegister from './Register/Register'
import ScreensSqueeze from './Squeeze/Squeeze'
import ScreensStatistics from './Statistics/Statistics'

const ScreensRoot = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate replace to={ApiUrl.LOGIN} />} />
      <Route path={ApiUrl.LOGIN} element={<ScreensLogin />} />
      <Route path={ApiUrl.REGISTER} element={<ScreensRegister />} />
      <Route path={ApiUrl.SQUEEZE} element={<ScreensSqueeze />} />
      <Route path={ApiUrl.STATISTICS} element={<ScreensStatistics />} />
    </Routes>
  </BrowserRouter>
)

export default ScreensRoot
