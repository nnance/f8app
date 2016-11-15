import Parse from 'parse'
import React from 'react'
import {Provider} from 'react-redux'

import env from './env'
import store from './store'
import {isServer} from './utils'
import * as auth from '../features/auth'

if (!isServer()) {
  Parse.initialize(env.PARSE_APP_ID)
  Parse.serverURL = env.PARSE_SERVER
  store.dispatch(auth.actions.becomeFromLocal())
}

export default function setup(Componant) {
  return () => (<Provider store={store}>
    <Componant/>
  </Provider>)
}
