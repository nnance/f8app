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

import ClogiiButton from 'ClogiiButton';

const React = require('react');
const { StyleSheet } = require('react-native');
const { connect } = require('react-redux');

const { logInWithFacebook } = require('../actions');

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 270,
  },
});

class LoginButton extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: false };
  }

  state: {
    isLoading: boolean;
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  props: {
    style: any;
    source?: string; // For Analytics
    dispatch: (action: any) => Promise;
    onLoggedIn: ?() => void;
  };

  _isMounted: boolean;

  async logIn() {
    const { dispatch, onLoggedIn } = this.props;

    this.setState({ isLoading: true });
    try {
      await Promise.race([
        dispatch(logInWithFacebook(this.props.source)),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
      return;
    } finally {
      if (this._isMounted) {
        this.setState({ isLoading: false });
      }
    }

    if (onLoggedIn) {
      onLoggedIn();
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ClogiiButton
          style={[styles.button, this.props.style]}
          caption="Please wait..."
        />
      );
    }

    return (
      <ClogiiButton
        style={[styles.button, this.props.style]}
        caption="ลงชื่อเข้าใช้ด้วย Facebook"
        onPress={() => this.logIn()}
      />
    );
  }
}

LoginButton.defaultProps = {
  source: null,
};

module.exports = connect()(LoginButton);
