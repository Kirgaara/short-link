import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

import { ApiUrl, URL } from '../../consts'
import { AppDispatch } from '../store'
import { DataState, StatisticsQuery } from '../../types'

const initialState: DataState = {
  shortLink: '',
  linkError: '',
  statistics: null,
  statisticsTotal: 0,
  statisticsError: '',
}

export const getShortLink = (link: string) => (dispatch: AppDispatch) => {
  axios
    .post(
      `${URL}${ApiUrl.SQUEEZE}?link=${link}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`,
        },
      }
    )
    .then((response) => {
      dispatch(
        dataReducerSlice.actions.getShortLink(
          `${URL}${ApiUrl.LINK}/${response.data.short}`
        )
      )
    })
    .catch((error) => {
      if (error.response.status === 422) {
        dispatch(dataReducerSlice.actions.errorLink('Ошибка валидации'))
      } else if (error.response.status === 401) {
        dispatch(
          dataReducerSlice.actions.errorLink(
            'Ошибка авторизации, попробуйте войти заново'
          )
        )
      } else {
        dispatch(
          dataReducerSlice.actions.errorLink('Пожалуйста, попробуйте позднее')
        )
      }
    })
}

export const getStatistics =
  ({ order, offset, limit }: StatisticsQuery) =>
  (dispatch: AppDispatch) => {
    axios({
      method: 'get',
      url: `${URL}${ApiUrl.STATISTICS}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('bearer-token')}`,
      },
      params: {
        order,
        offset,
        limit,
      },
    })
      .then((response) => {
        dispatch(dataReducerSlice.actions.getStatistics(response.data))
      })
      .catch((error) => {
        if (error.response.status === 422) {
          dispatch(dataReducerSlice.actions.errorStatistics('Ошибка валидации'))
        } else if (error.response.status === 401) {
          dispatch(
            dataReducerSlice.actions.errorStatistics('Ошибка авторизации')
          )
        } else {
          dispatch(
            dataReducerSlice.actions.errorStatistics('Ошибка загрузки данных')
          )
        }
      })
  }

export const getStatisticsTotal = // необходимо вызывать отдельно для корректной пагинации

    ({ order, offset, limit }: StatisticsQuery) =>
    (dispatch: AppDispatch) => {
      axios({
        method: 'get',
        url: `${URL}${ApiUrl.STATISTICS}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('bearer-token')}`,
        },
        params: {
          order,
          offset,
          limit,
        },
      })
        .then((response) => {
          dispatch(
            dataReducerSlice.actions.getStatisticsTotal(response.data.length)
          )
        })
        .catch((error) => {
          if (error.response.status === 422) {
            dispatch(
              dataReducerSlice.actions.errorStatistics('Ошибка валидации')
            )
          } else if (error.response.status === 401) {
            dispatch(
              dataReducerSlice.actions.errorStatistics('Ошибка авторизации')
            )
          } else {
            dispatch(
              dataReducerSlice.actions.errorStatistics('Ошибка загрузки данных')
            )
          }
        })
    }

export const exitProfileData = () => (dispatch: AppDispatch) => {
  dispatch(dataReducerSlice.actions.exitProfileData())
}

export const dataReducerSlice = createSlice({
  name: 'dataReducer',
  initialState,
  reducers: {
    getShortLink(state, action) {
      state.shortLink = action.payload
      state.linkError = ''
    },
    errorLink(state, action) {
      state.linkError = action.payload
    },
    getStatistics(state, action) {
      state.statistics = action.payload
      state.statisticsError = ''
    },
    getStatisticsTotal(state, action) {
      state.statisticsTotal = action.payload
      state.statisticsError = ''
    },
    errorStatistics(state, action) {
      state.statisticsError = action.payload
    },
    exitProfileData(state) {
      state.statistics = null
      state.statisticsError = ''
      state.linkError = ''
    },
  },
})

export default dataReducerSlice.reducer
