'use strict';

import React from 'React';
import {Image, View, Text, TextInput} from 'react-native';
import F8Button from 'F8Button';
import styles from './styles';

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
        source={require('./img/login-background.png')}>
        <View style={styles.inputSession}>
          <Text style={styles.errorText}>
            {error}
          </Text>
          <TextInput
            onChangeText={(email) => this.setState({email})}
            style={styles.input}
            placeholder='email'
            value={this.state.email || ''}
            keyboardType='email-address'
            autoCapitalize='none'
            returnKeyType='next'
            />
          <TextInput
            onChangeText={(password) => this.setState({password})}
            style={styles.input}
            secureTextEntry={true}
            value={this.state.password || ''}
            placeholder='password'
            />
          <Text
            style={styles.forgotPasswordText}
            onPress={() => pushPage('forgotPassword')}>
            forgot password?
          </Text>
        </View>
        <View style={styles.buttonSession}>
          <F8Button
            caption='Login'
            onPress={() => logIn(this.state.email || '', this.state.password || '')}/>
          <Text
            style={styles.changePageText}
            onPress={() => pushPage('signup')}>
            or sign up now
          </Text>
        </View>
      </Image>
    )
  }
}
