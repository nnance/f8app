'use strict';

import React from 'React';
import {Image, View, Text, TextInput} from 'react-native';
import F8Button from 'F8Button';
import {connect} from 'react-redux';
import {actions, selector} from '../../../web/features/auth';

import styles from './styles';

class ForgotPasswordScreen extends React.Component {
  componentDidMount() {
    this.props.clearError()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forgotPasswordState === 'ed') {
      this.props.pushPage('success', {successText: 'mail has been sent'})
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
        </View>
        <View style={styles.buttonSession}>
          <F8Button caption='Forgot password' onPress={() => this.props.forgotPassword(this.email)}/>
          <Text style={styles.changePageText} onPress={() => this.props.goBack()}>or back to login</Text>
        </View>
      </Image>
    )
  }
}

const select = state => ({
  user: selector.user(state),
  error: selector.error(state),
  forgotPasswordState: selector.forgotPasswordState(state)
})

const actionsMaping = {
  clearError: actions.clearError,
  forgotPassword: actions.forgotPassword
}

export default connect(select, actionsMaping)(ForgotPasswordScreen)
