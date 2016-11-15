import { createAction } from 'redux-actions'

import * as types from './actionTypes'

let Parse = null

export function setParse(_Parse) {
  Parse = _Parse
}

export const logingIn = createAction(types.LOGING_IN)
export const loggedIn = createAction(types.LOGGED_IN)
export const loggedOut = createAction(types.LOGGED_OUT)
export const authError = createAction(types.AUTH_ERROR)
export const signingUp = createAction(types.SIGNING_UP)
export const signedUp = createAction(types.SIGNED_UP)
export const reqingForgotPassword = createAction(types.REQING_FORGOT_PASSWORD)
export const reqedForgotPassword = createAction(types.REQED_FORGOT_PASSWORD)
export const clearError = createAction(types.CLEAR_ERROR)
export const clearState = createAction(types.CLEAR_STATE)

export function parseUser () {
  return Parse.User.current().get('username')
}

export const becomeFromLocal = () => dispatch => {
  if (Parse.User.current()) {
    dispatch(loggedIn(parseUser()))
  }
}

export const forgotPassword = email => dispatch => {
  dispatch(reqingForgotPassword())
  return Parse.User.requestPasswordReset(email).then(() => {
    dispatch(reqedForgotPassword())
  }, error => {
    dispatch(authError(error.message))
  })
}

export const logIn = (email, password) => dispatch => {
  dispatch(logingIn())
  return Parse.User.logIn(email, password).then(() => {
    dispatch(loggedIn(parseUser()))
  }, error => {
    dispatch(authError(error.message))
  })
}

export const logOut = () => dispatch => {
  Parse.User.logOut()
  dispatch(loggedOut())
}

export const signUp = (email, password, confirmPassword) => dispatch => {
  dispatch(signingUp())
  if (password !== confirmPassword) {
    dispatch(authError('password not match'))
    return
  }
  const user = new Parse.User()
  user.set('username', email)
  user.set('password', password)
  user.set('email', email)
  return user.save().then(() => {
    dispatch(signedUp())
    dispatch(logIn(email, password))
  }, error => {
    dispatch(authError(error.message))
  })
}
