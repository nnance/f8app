'use strict';

import React from 'React';
import {Image, View, Text, TextInput} from 'react-native';
import F8Button from 'F8Button';

import styles from './styles';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <Image
        style={styles.container}
        source={require('../img/login-background.png')}>
        <View style={styles.inputSession}>
          <TextInput style={styles.input} placeholder='email'/>
          <TextInput style={styles.input} secureTextEntry={true} placeholder='password'/>
          <Text style={styles.forgotPasswordText} onPress={() => this.props.pushPage('forgotPassword')}>forgot password?</Text>
        </View>
        <View style={styles.buttonSession}>
          <F8Button caption='Login' onPress={() => console.log('Login Click ;)')}/>
          <Text style={styles.changePageText} onPress={() => this.props.pushPage('signup')}>or sign up now</Text>
        </View>
      </Image>
    )
  }
}
