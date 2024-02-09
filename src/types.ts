import { LoginError, RegisterError } from './consts'

// data

export interface UserInfo {
  username: string
  password: string
}

export interface LinkInfo {
  id: number
  short: string
  target: string
  counter: number
}

export interface StatisticsQuery {
  order: string
  offset: number
  limit: number
}
export type LoginErrorType = keyof typeof LoginError | null
export type RegisterErrorType = keyof typeof RegisterError | null

// reducers

export interface UserState {
  authStatus: boolean
  loginError: LoginErrorType | null
  registerError: RegisterErrorType | null
  username: string | null
}

export interface DataState {
  shortLink: string
  linkError: string
  statistics: Array<LinkInfo> | null
  statisticsTotal: number
  statisticsError: string
}
