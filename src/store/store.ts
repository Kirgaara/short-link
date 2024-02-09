import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'

const rootReducer = combineReducers({
  userReducer,
  dataReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
