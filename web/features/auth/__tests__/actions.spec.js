import * as actions from '../actions'

const mockUser = {
  get: jest.fn().mockReturnValue('passuser')
}

const ParseMock = {
  User: jest.fn()
}

ParseMock.User.current = jest.fn(() => mockUser),
ParseMock.User.logIn = jest.fn((username, password) => {
  if (username === 'passuser') {
    return Promise.resolve(mockUser)
  }
  return Promise.reject(new Error('invalid username or password'))
})
ParseMock.User.logOut = jest.fn()
ParseMock.User.requestPasswordReset = jest.fn()

actions.setParse(ParseMock);

test('logIn valid user', async () => {
  const loginThunk = actions.logIn('passuser', '1234')
  const dispatch = jest.fn()
  await loginThunk(dispatch)
  expect(dispatch).lastCalledWith(actions.loggedIn(actions.parseUser()))
})

test('logIn invalid user', async () => {
  const loginThunk = actions.logIn('fail', 'fail')
  const dispatch = jest.fn()
  await loginThunk(dispatch)
  expect(dispatch).lastCalledWith(actions.authError('invalid username or password'))
})

test('signUp fail', async () => {
  ParseMock.User.mockImplementation(function() {
    this.set = jest.fn()
    this.save = jest.fn().mockReturnValue(Promise.reject(new Error('duplicate username')))
  })
  const thunk = actions.signUp('passuser', '1234', '1234')
  const dispatch = jest.fn()
  await thunk(dispatch)
  expect(dispatch).lastCalledWith(actions.authError('duplicate username'))
  ParseMock.User.mockReset()
})

test('signUp ok', async () => {
  ParseMock.User.mockImplementation(function() {
    this.set = jest.fn()
    this.save = jest.fn().mockReturnValue(Promise.resolve(mockUser))
  })
  const thunk = actions.signUp('passuser', '1234', '1234')
  const dispatch = jest.fn()
  await thunk(dispatch)
  expect(dispatch.mock.calls[dispatch.mock.calls.length - 2][0]).toEqual(actions.signedUp())
  ParseMock.User.mockReset()
})

test('logOut', () => {
  const thunk = actions.logOut()
  const dispatch = jest.fn()
  ParseMock.User.logOut.mockClear()
  thunk(dispatch)
  expect(dispatch).toHaveBeenCalledWith(actions.loggedOut())
})

test('becomeFromLocal can get loggedIn', () => {
  const thunk = actions.becomeFromLocal()
  const dispatch = jest.fn()
  ParseMock.User.current.mockImplementationOnce(() => mockUser)
  thunk(dispatch)
  expect(dispatch).toHaveBeenCalledWith(actions.loggedIn(actions.parseUser()))
})

test('becomeFromLocal cant get loggedIn', () => {
  const thunk = actions.becomeFromLocal()
  const dispatch = jest.fn()
  ParseMock.User.current.mockImplementationOnce(() => undefined)
  thunk(dispatch)
  expect(dispatch.mock.calls.length).toBe(0)
})

test('forgotPassword ok', async () => {
  ParseMock.User.requestPasswordReset.mockImplementationOnce(() => Promise.resolve())
  const thunk = actions.forgotPassword('a@a.com')
  const dispatch = jest.fn()
  await thunk(dispatch)
  expect(dispatch).toHaveBeenCalledWith(actions.reqedForgotPassword())
})

test('forgotPassword ok', async () => {
  ParseMock.User.requestPasswordReset.mockImplementationOnce(() => Promise.reject(new Error('not found')))
  const thunk = actions.forgotPassword('a@a.com')
  const dispatch = jest.fn()
  await thunk(dispatch)
  expect(dispatch).toHaveBeenCalledWith(actions.authError('not found'))
})
