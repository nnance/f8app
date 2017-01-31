'use strict';

import React from 'React';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import ClogiiButton from 'ClogiiButton';
import styles from './styles';

import {DashButtonWithContainer} from './DashButton';
import TextInput from '../common/TextInput';

export default class EmailLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null
    };
  }

  render() {
    const {logIn, pushPage} = this.props;
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
              value={this.state.email || ''}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={(password) => this.setState({password})}
              style={styles.input}
              secureTextEntry={true}
              value={this.state.password || ''}
              placeholder="รหัสผ่าน"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              />
          </View>
          <ClogiiButton
            style={styles.emailButton}
            type="white"
            caption="เข้าสู่ระบบ"
            onPress={
              () => {
                this.setState({loading: true});
                return logIn(this.state.email || '', this.state.password || '')
                  .catch(_error => this.setState({error: _error.message}))
                  .then(() => this.setState({loading: false}));
              }
            }/>
        </View>
        <View style={styles.buttonSession}>
          <TouchableOpacity onPress={pushPage.bind(null, 'forgotPassword')}>
            <Text
              style={styles.forgotPasswordText}>
              ลืมรหัสผ่าน
            </Text>
          </TouchableOpacity>
        </View>
        <DashButtonWithContainer caption="สร้างบัญชีใหม่" onPress={pushPage.bind(null, 'signup')} style={{margin: 20}}/>
      </Image>
    );
  }
}
