'use strict';

import React from 'React';
import {Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import ClogiiButton from 'ClogiiButton';
import styles from './styles';

import {SignupButtonWithContainer} from './SignupButton';

export default class EmailLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {error, logIn, pushPage, user} = this.props;
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
              placeholder='email'
              value={this.state.email || ''}
              keyboardType='email-address'
              autoCapitalize='none'
              returnKeyType='next'
              placeholderTextColor='rgba(255, 255, 255, 0.6)'
              />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={(password) => this.setState({password})}
              style={styles.input}
              secureTextEntry={true}
              value={this.state.password || ''}
              placeholder='password'
              placeholderTextColor='rgba(255, 255, 255, 0.6)'
              />
          </View>
          <ClogiiButton
            style={styles.emailButton}
            type='white'
            caption='Login'
            onPress={() => logIn(this.state.email || '', this.state.password || '')}/>
        </View>
        <View style={styles.buttonSession}>
          <TouchableOpacity onPress={() => pushPage('forgotPassword')}>
            <Text
              style={styles.forgotPasswordText}>
              ลืมรหัสผ่าน
            </Text>
          </TouchableOpacity>
        </View>
        <SignupButtonWithContainer onPress={() => pushPage('signup')}/>
      </Image>
    )
  }
}
