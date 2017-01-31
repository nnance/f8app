'use strict';

import React from 'React';
import {Image, View, Text} from 'react-native';
import ClogiiButton from 'ClogiiButton';

import TextInput from '../common/TextInput';

import styles from './styles';

export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null
    };
  }

  render(){
    const {forgotPassword} = this.props;
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
              value={this.state.email || ''}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              />
          </View>
          <ClogiiButton
            type="white"
            style={styles.emailButton}
            caption="รับรหัสผ่านใหม่"
            onPress={
              () => {
                this.setState({
                  loading: true
                });
                return forgotPassword(this.state.email || '')
                  .then(() => {
                    this.props.onReqed && this.props.onReqed();
                  })
                  .catch(_error => this.setState({error: _error.message}))
                  .then(() => {
                    this.setState({
                      loading: false
                  });
                });
              }
            }/>
        </View>
      </Image>
    );
  }
}
