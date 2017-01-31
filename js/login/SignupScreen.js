'use strict';

import React from 'React';
import {View, Text, Image} from 'react-native';
import ClogiiButton from 'ClogiiButton';

import TextInput from '../common/TextInput';
import {DashButtonWithContainer} from './DashButton';

import styles from './styles';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    const {error} = this.state;
    return (
      <Image
        style={styles.container}
        source={require('./img/email-bg.png')}>
        <View style={styles.inputSession}>
          <Text style={styles.errorText}>
            {error}
          </Text>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={(email) => this.setState({email})}
              style={styles.input}
              placeholder="อีเมล"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={(password) => this.setState({password})}
              style={styles.input}
              secureTextEntry={true}
              placeholder="รหัสผ่าน"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"/>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}
              style={styles.input}
              secureTextEntry={true}
              placeholder="ยืนยันรหัสผ่าน"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"/>
          </View>
          <ClogiiButton
            style={styles.emailButton}
            type="white"
            caption="สร้างบัญชี"
            onPress={this.onSignUp.bind(this)}/>
        </View>
        <DashButtonWithContainer caption="ลงชื่อเข้าใช้ด้วย Facebook" onPress={this.props.logInWithFacebook} style={{margin: 20}}/>
      </Image>
    );
  }

  onSignUp() {
    this.setState({
      loading: true
    });
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        error: 'password not match'
      });
      return Promise.resolve();
    }
    return this.props.signUp(this.state.email || '', this.state.password || '')
      .then(() => {
        this.onSignedUp();
      })
      .catch(error => this.setState({error: error.message}))
      .then(() => {
        this.setState({
          loading: false
        });
      });
  }

  onSignedUp() {
    this.props.logIn && this.props.logIn(this.state.email || '', this.state.password || '');
    this.props.onSignedUp && this.props.onSignedUp(this.state.email, this.state.password);
  }
}
