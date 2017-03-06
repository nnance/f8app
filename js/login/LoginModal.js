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

const F8Colors = require('F8Colors');
const Image = require('Image');
const React = require('React');
const StyleSheet = require('StyleSheet');
const { Text } = require('F8Text');
const View = require('View');
const F8Button = require('F8Button');
const Navigator = require('Navigator');
const LoginButton = require('../common/LoginButton');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    padding: 30,
    backgroundColor: 'transparent',
    borderRadius: 3,
    alignItems: 'center',
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: F8Colors.darkText,
    textAlign: 'center',
    marginTop: 130,
  },
  h2: {
    fontSize: 18,
    lineHeight: 22,
    color: F8Colors.darkText,
    textAlign: 'center',
    marginBottom: 120,
  },
  notNowButton: {
    padding: 20,
  },
  notNowLabel: {
    color: F8Colors.lightText,
  },
});

class LoginModal extends React.Component {
  props: {
    navigator: Navigator;
    onLogin: () => void;
  };

  loggedIn() {
    this.props.navigator.pop();
    this.props.onLogin();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.content}
          source={require('../assets/login/bg.png')}
        >
          <Text style={styles.h1}>
            Log in with Facebook
          </Text>
          <Text style={styles.h2}>
            to save sessions to{'\n'}your schedule.
          </Text>
          <LoginButton onLoggedIn={() => this.loggedIn()} />
          <F8Button
            type="secondary"
            caption="Not Now"
            source="Modal"
            onPress={() => this.props.navigator.pop()}
          />
        </Image>
      </View>
    );
  }
}

module.exports = LoginModal;
