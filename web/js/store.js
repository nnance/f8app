import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import * as auth from '../features/auth'

const reducer = combineReducers({
  [auth.constants.NAME]: auth.reducer
})

let store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger())
)

export default store
