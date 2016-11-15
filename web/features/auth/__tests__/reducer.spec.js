import reducer from '../reducer'
import * as actions from '../actions'

test('LOGING_IN should set state to logingIn', () => {
  const nextState = reducer(null, actions.logingIn())
  expect(nextState.logingIn).toBe(true)
})

test('LOGING_IN should clear error', () => {
  const nextState = reducer({ error: 'error' }, actions.logingIn())
  expect(nextState.error).toBeNull()
})

test('LOGGED_IN should set user data and clear error', () => {
  const nextState = reducer({ error: 'error' }, actions.loggedIn({name: 'adam'}))
  expect(nextState.user).toEqual({name: 'adam'})
  expect(nextState.error).toBeNull()
})

test('handle LOGGED_OUT', () => {
  const nextState = reducer({
    user: { name: 'adam' }
  }, actions.loggedOut())
  expect(nextState.user).toBeNull()
})

test('handle AUTH_ERROR', () => {
  const nextState = reducer(null, actions.authError('invalid email'))
  expect(nextState.error).toBe('invalid email')
})

test('AUTH_ERROR should reset signUpState', () => {
  const nextState = reducer({ signUpState: 'ing' }, actions.authError('invalid'))
  expect(nextState.signUpState).toBe('none')
})

test('SIGNING_UP should set state signUpState to ing', () => {
  const nextState = reducer(null, actions.signingUp())
  expect(nextState.signUpState).toBe('ing')
})

test('SIGNED_UP should set state signUpState to ed', () => {
  const nextState = reducer(null, actions.signedUp())
  expect(nextState.signUpState).toBe('ed')
})

test('LOGGED_OUT should set state to initial', () => {
  const nextState = reducer({user: 'x'}, actions.loggedOut())
  expect(nextState).toEqual(reducer(undefined, {}))
})

test('AUTH_ERROR should reset forgotPasswordState', () => {
  const nextState = reducer({ forgotPasswordState: 'ing' }, actions.authError('invalid'))
  expect(nextState.forgotPasswordState).toBe('none')
})
