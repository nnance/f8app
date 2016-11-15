import * as types from './actionTypes'

const initialState = {
  logingIn: false,
  signUpState: 'none',
  forgotPasswordState: 'none',
  user: null
}

function logInHandle(state = initialState, action) {
  if (action.type === types.LOGING_IN) {
    return {
      ...state,
      error: null,
      logingIn: true
    }
  }
  if (action.type === types.LOGGED_IN) {
    return {
      ...state,
      logingIn: false,
      error: null,
      user: action.payload
    }
  }
  if (action.type === types.LOGGED_OUT) {
    return initialState
  }
  return state
}

function signUpHandle(state = initialState, action) {
  if (action.type === types.SIGNING_UP) {
    return {
      ...state,
      signUpState: 'ing',
      error: null
    }
  }
  if (action.type === types.SIGNED_UP) {
    return {
      ...state,
      signUpState: 'ed',
      error: null
    }
  }
  if (action.type === types.AUTH_ERROR) {
    return {
      ...state,
      logingIn: false,
      user: null,
      error: action.payload,
      forgotPasswordState: 'none',
      signUpState: 'none'
    }
  }
  if (action.type === types.CLEAR_ERROR) {
    return {
      ...state,
      error: null
    }
  }
  if (action.type === types.CLEAR_STATE) {
    return initialState
  }
  return state
}

function forgotPasswordHandle(state = initialState, action) {
  if (action.type === types.REQING_FORGOT_PASSWORD) {
    return {
      ...state,
      forgotPasswordState: 'ing',
      error: null
    }
  }
  if (action.type === types.REQED_FORGOT_PASSWORD) {
    return {
      ...state,
      forgotPasswordState: 'ed',
      error: null
    }
  }
  return state
}

export default function (state = initialState, action) {
  const handles = [
    forgotPasswordHandle,
    logInHandle,
    signUpHandle
  ]
  return handles.reduce((state, fn) => fn(state, action), state)
}
