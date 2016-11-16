'use strict';

import React from 'React';
import {View, Text, TextInput, Image} from 'react-native';
import F8Button from 'F8Button';
import {connect} from 'react-redux';
import {actions, selector} from '../../../web/features/auth';

import styles from './styles';

class SignupScreen extends React.Component {
  constructor() {
    super()
    this.signUp = this.signUp.bind(this)
    this.email = ''
    this.password = ''
    this.confirmPassword = ''
  }

  componentDidMount() {
    this.props.clearError();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signUpState === 'ed') {
      this.props.pushPage('success', {successText: 'signed Up'})
    }
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
          <TextInput onChangeText={(confirmPassword) => this.confirmPassword = confirmPassword} style={styles.input} secureTextEntry={true} placeholder='confirm password'/>
        </View>
        <View style={styles.buttonSession}>
          <F8Button caption='Signup' onPress={this.signUp}/>
          <Text style={styles.changePageText} onPress={() => this.props.goBack()}>or back to login</Text>
        </View>
      </Image>
    )
  }

  signUp() {
    this.props.signUp(this.email, this.password, this.confirmPassword)
  }
}

const select = state => ({
  error: selector.error(state),
  signUpState: selector.signUpState(state)
});

const actionsMaping = {
  clearError: actions.clearError,
  signUp: actions.signUp
};

export default connect(select, actionsMaping)(SignupScreen)
