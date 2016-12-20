'use strict';

import React from 'React';
import {Image, View, Text, TextInput} from 'react-native';
import ClogiiButton from 'ClogiiButton';
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
              keyboardType='email-address'
              autoCapitalize='none'
              value={this.state.email || ''}
              placeholderTextColor='rgba(255, 255, 255, 0.6)'
              />
          </View>
          <ClogiiButton
            type='white'
            style={styles.emailButton}
            caption='รับรหัสผ่านใหม่'
            onPress={() => forgotPassword(this.state.email || '')}/>
        </View>
      </Image>
    )
  }
}
