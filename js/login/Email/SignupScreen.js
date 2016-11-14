'use strict';

import React from 'React';
import {View, Text, TextInput, Image} from 'react-native';
import F8Button from 'F8Button';

import styles from './styles';

export default class SignupScreen extends React.Component {
  render() {
    return (
      <Image
        style={styles.container}
        source={require('../img/login-background.png')}>
        <View style={styles.inputSession}>
          <TextInput style={styles.input} placeholder='email'/>
          <TextInput style={styles.input} secureTextEntry={true} placeholder='password'/>
          <TextInput style={styles.input} secureTextEntry={true} placeholder='confirm password'/>
        </View>
        <View style={styles.buttonSession}>
          <F8Button caption='Signup' onPress={() => console.log('Signup Click ;)')}/>
          <Text style={styles.changePageText} onPress={() => this.props.goBack()}>or back to login</Text>
        </View>
      </Image>
    )
  }
}
