/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule App
 * @flow
 */


import React from 'react';

import LoginScreen from './login/LoginScreen';
import ClogiiNavigator from './ClogiiNavigator';

const AppState = require('AppState');
const CodePush = require('react-native-code-push');
const { updateInstallation } = require('./actions/installation');
const { connect } = require('react-redux');

const { version } = require('./env.js');

class App extends React.Component {
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    // this.props.dispatch(loadViewer());
    // this.props.dispatch(loadNotifications());
    // this.props.dispatch(loadConfig());
    // this.props.dispatch(loadSessions());
    // this.props.dispatch(loadFriendsSchedules());
    // this.props.dispatch(loadSurveys());

    updateInstallation({ version });
    CodePush.sync({ installMode: CodePush.InstallMode.ON_NEXT_RESUME });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'active') {
      // this.props.dispatch(loadSessions());
      // this.props.dispatch(loadNotifications());
      // this.props.dispatch(loadSurveys());
      CodePush.sync({ installMode: CodePush.InstallMode.ON_NEXT_RESUME });
    }
  }

  render() {
    // if (!this.props.isLoggedIn) {
    //   return <LoginScreen />;
    // }
    return <ClogiiNavigator />;
  }
}

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

module.exports = connect(select)(App);
