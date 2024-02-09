import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

import { ApiUrl, URL } from '../../consts'
import { AppDispatch } from '../store'
import { UserInfo, UserState } from '../../types'

const initialState: UserState = {
  username: null,
  authStatus: false,
  loginError: null,
  registerError: null,
}

export const login =
  ({ username, password }: UserInfo) =>
  (dispatch: AppDispatch) => {
    axios
      .post(`${URL}${ApiUrl.LOGIN}`, {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem('bearer-token', response.data.access_token)
        dispatch(userReducerSlice.actions.getUserData(username))
      })
      .catch((error) => {
        if (
          error.response.status === 400 &&
          error.response.data.detail === 'login and password do not match'
        ) {
          dispatch(userReducerSlice.actions.errorLoginMismatch())
        } else if (error.response.status === 422) {
          dispatch(userReducerSlice.actions.errorLoginValidation())
        } else {
          dispatch(userReducerSlice.actions.errorLoginOther())
        }
      })
  }

export const register =
  ({ username, password }: UserInfo) =>
  (dispatch: AppDispatch) => {
    axios
      .post(
        `${URL}${ApiUrl.REGISTER}?username=${username}&password=${password}`
      )
      .then((response) => {
        dispatch(userReducerSlice.actions.getUserData(username))
      })
      .then(() => {
        alert('Вы успешно зарегистрировались')
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          dispatch(userReducerSlice.actions.errorRegistrationValidation())
        } else {
          dispatch(userReducerSlice.actions.errorRegistrationOther())
        }
      })
  }

export const exitProfile = () => (dispatch: AppDispatch) => {
  dispatch(userReducerSlice.actions.exitProfile())
}

export const userReducerSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    getUserData(state, action) {
      state.username = action.payload
      state.authStatus = true
      state.loginError = null
    },
    errorLoginMismatch(state) {
      state.loginError = 'LOGIN_MISMATCH'
    },
    errorLoginValidation(state) {
      state.loginError = 'VALIDATION_ERROR'
    },
    errorLoginOther(state) {
      state.loginError = 'LOGIN_ERROR'
    },
    errorRegistrationValidation(state) {
      state.registerError = 'VALIDATION_ERROR'
    },
    errorRegistrationOther(state) {
      state.registerError = 'REGISTER_ERROR'
    },
    exitProfile(state) {
      state.authStatus = false
      state.username = ''
    },
  },
})

export default userReducerSlice.reducer
