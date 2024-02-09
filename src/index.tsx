import * as ReactDOMClient from 'react-dom/client'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'
import ScreensRoot from './screens/Root'
import './index.scss'

const store = setupStore()
const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLDivElement
)

root.render(
  <Provider store={store}>
    <ScreensRoot />
  </Provider>
)
