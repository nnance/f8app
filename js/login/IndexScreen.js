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
import {
  StatusBar,
  View,
  Image,
} from 'react-native';

import { DashButtonWithContainer } from './DashButton';

const F8Colors = require('F8Colors');
const React = require('React');
const StyleSheet = require('StyleSheet');
const { Text } = require('F8Text');
const { connect } = require('react-redux');
const LoginButton = require('../common/LoginButton');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  last: {
    justifyContent: 'flex-end',
  },
  button: {
    margin: 10,
    height: 40,
    width: 250,
  },
  loginComment: {
    marginBottom: 14,
    fontSize: 12,
    color: F8Colors.darkText,
    textAlign: 'center',
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
  },
});

class IndexScreen extends React.Component {
  componentDidMount() {
    if (StatusBar) {
      StatusBar.setBarStyle('default');
    }
  }

  render() {
    return (
      <Image
        style={styles.container}
        source={require('../assets/login/bg.png')}
      >
        <View style={{ flex: 7, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 4 }} />
          <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ flex: 1, resizeMode: 'contain', width: undefined, height: undefined }}
                source={require('../assets/login/header.png')}
              />
            </View>
          </View>
          <Text style={{ flex: 4, fontSize: 12, color: 'white' }}>ที่ที่จักวาลของคุณ จะอยู่ง่าย... แค่ปลายนิ้ว</Text>
        </View>
        <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
          <LoginButton source="First screen" style={styles.button} />
          <ClogiiButton
            type="bordered"
            style={styles.button}
            onPress={() => this.props.pushPage('email-login')}
            caption="ลงชื่อเข้าใช้ผ่านอีเมล"
          />
          <DashButtonWithContainer caption="สร้างบัญชีใหม่" onPress={() => this.props.pushPage('signup')} />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ color: F8Colors.fadedLightText, fontSize: 10 }}>
            By signing up you agree to our Terms & Privacy policy
          </Text>
        </View>
      </Image>
    );
  }
}

export default connect()(IndexScreen);
export {
  IndexScreen as Component,
};
