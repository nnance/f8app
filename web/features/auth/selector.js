import {NAME} from './constants'

export const mState = state => state[NAME]
export const user = state => mState(state).user
export const error = state => mState(state).error
