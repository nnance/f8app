'use strict';

import React from 'React';
import {View, Text, TextInput, Image} from 'react-native';
import F8Button from 'F8Button';

import styles from './styles';

export default ({error, signUp, goBack}) => (
  <Image
    style={styles.container}
    source={require('../img/login-background.png')}>
    <View style={styles.inputSession}>
      <Text style={styles.errorText}>{error}</Text>
      <TextInput onChangeText={(email) => this.email = email} style={styles.input} placeholder='email'/>
      <TextInput onChangeText={(password) => this.password = password} style={styles.input} secureTextEntry={true} placeholder='password'/>
      <TextInput onChangeText={(confirmPassword) => this.confirmPassword = confirmPassword} style={styles.input} secureTextEntry={true} placeholder='confirm password'/>
    </View>
    <View style={styles.buttonSession}>
      <F8Button caption='Signup' onPress={() => signUp(this.email || '', this.password || '', this.confirmPassword || '')}/>
      <Text style={styles.changePageText} onPress={() => goBack()}>or back to login</Text>
    </View>
  </Image>
)
