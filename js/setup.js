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
 * @flow
 */


import { ApolloProvider } from 'react-apollo';
import moment from 'moment';
import 'moment/locale/th';

const App = require('App');
const FacebookSDK = require('FacebookSDK');
const Parse = require('parse/react-native');
const React = require('React');

const apollo = require('./store/apollo');
const configureStore = require('./store/configureStore');
const env = require('./env');

const { parse } = env;

function setup(): React.Component {
  console.disableYellowBox = true;
  console.log(env);
  Parse.initialize(env.parse.appID, env.parse.javascriptKey);
  Parse.serverURL = `${parse.url}`;

  FacebookSDK.init();
  Parse.FacebookUtils.init();

  moment.locale('th');

  class Root extends React.Component {
    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({ isLoading: false })),
        client: apollo,
      };
    }
    render() {
      if (this.state.isLoading) {
        return null;
      }
      return (
        <ApolloProvider store={this.state.store} client={this.state.client}>
          <App />
        </ApolloProvider>
      );
    }
  }

  return Root;
}

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};

module.exports = setup;
