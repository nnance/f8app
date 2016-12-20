'use strict';

import React from 'React';
import {Image, View, Text, TextInput} from 'react-native';
import F8Button from 'F8Button';
import {connect} from 'react-redux';

import styles from './styles';

export default class ForgotPasswordScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isReqedForgotPassword) {
      this.props.clearIsReqedForgotPassword();
      this.props.pushPage('success', {successText: 'mail has been sent'});
    }
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    const {error, forgotPassword, goBack} = this.props;
    return (
      <Image
        style={styles.container}
        source={require('./img/bg.png')}>
        <View style={styles.inputSession}>
          <Text style={styles.errorText}>
            {error}
          </Text>
          <TextInput
            onChangeText={(email) => this.setState({email})}
            style={styles.input}
            placeholder='email'
            keyboardType='email-address'
            autoCapitalize='none'
            value={this.state.email || ''}
            />
        </View>
        <View style={styles.buttonSession}>
          <F8Button
            caption='Forgot password'
            onPress={() => forgotPassword(this.state.email || '')}/>
          <Text
            style={styles.changePageText}
            onPress={() => goBack()}>
            or back to login
          </Text>
        </View>
      </Image>
    )
  }
}
