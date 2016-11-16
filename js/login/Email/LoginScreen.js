'use strict';

import React from 'React';
import {Image, View, Text, TextInput} from 'react-native';
import F8Button from 'F8Button';
import {connect} from 'react-redux';
import {actions, selector} from '../../../web/features/auth';

import styles from './styles';

class LoginScreen extends React.Component {
  constructor() {
    super()
    this.logIn = this.logIn.bind(this)
    this.email = ''
    this.password = ''
  }

  componentDidMount() {
    this.props.clearError()
  }

  render() {
    return (
      <Image
        style={styles.container}
        source={require('../img/login-background.png')}>
        <View style={styles.inputSession}>
          <Text style={styles.errorText}>{this.props.error}</Text>
          <TextInput onChangeText={(email) => this.email = email} style={styles.input} placeholder='email'/>
          <TextInput onChangeText={(password) => this.password = password} style={styles.input} secureTextEntry={true} placeholder='password'/>
          <Text style={styles.forgotPasswordText} onPress={() => this.props.pushPage('forgotPassword')}>forgot password?</Text>
        </View>
        <View style={styles.buttonSession}>
          <F8Button caption='Login' onPress={this.logIn}/>
          <Text style={styles.changePageText} onPress={() => this.props.pushPage('signup')}>or sign up now</Text>
        </View>
      </Image>
    )
  }

  logIn() {
    this.props.logIn(this.email, this.password)
  }
}

const select = state => ({
  user: selector.user(state),
  error: selector.error(state)
})

const actionsMaping = {
  clearError: actions.clearError,
  logIn: actions.logIn
}

export default connect(select, actionsMaping)(LoginScreen)
