export const URL = 'https://front-test.hex.team/api'

export const ApiUrl = {
  LOGIN: '/login',
  REGISTER: '/register',
  SQUEEZE: '/squeeze',
  STATISTICS: '/statistics',
  LINK: '/s',
}

export const LoginError = {
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_MISMATCH: 'LOGIN_MISMATCH',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const

export const RegisterError = {
  REGISTER_ERROR: 'REGISTER_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const

export const RegExpTest = {
  USERNAME: /^[A-Za-zА-Яа-я0-9 .,@-_]+$/,
  PASSWORD: /^[A-Za-zА-Яа-я0-9 .,@-_]+$/,
}
