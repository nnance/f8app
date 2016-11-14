'use strict';

import React from 'React';
import {Image, View, Text, TextInput} from 'react-native';
import F8Button from 'F8Button';

import styles from './styles';

export default class ForgotPasswordScreen extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Image
        style={styles.container}
        source={require('../img/login-background.png')}>
        <View style={styles.inputSession}>
          <TextInput style={styles.input} placeholder='email'/>
        </View>
        <View style={styles.buttonSession}>
          <F8Button caption='Forgot password' onPress={() => console.log('Forgot password Click ;)')}/>
          <Text style={styles.changePageText} onPress={() => this.props.goBack()}>or back to login</Text>
        </View>
      </Image>
    )
  }
}
