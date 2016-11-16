'use strict';

import React from 'React';
import {Image, View, Text, TextInput} from 'react-native';
import F8Button from 'F8Button';
import {connect} from 'react-redux';
import {actions, selector} from '../../../web/features/auth';

import styles from './styles';

export default ({error, logIn, pushPage, user}) => (
  <Image
    style={styles.container}
    source={require('../img/login-background.png')}>
    <View style={styles.inputSession}>
      <Text>{user}</Text>
      <Text style={styles.errorText}>{error}</Text>
      <TextInput onChangeText={(email) => this.email = email} style={styles.input} placeholder='email'/>
      <TextInput onChangeText={(password) => this.password = password} style={styles.input} secureTextEntry={true} placeholder='password'/>
      <Text style={styles.forgotPasswordText} onPress={() => pushPage('forgotPassword')}>forgot password?</Text>
    </View>
    <View style={styles.buttonSession}>
      <F8Button caption='Login' onPress={() => logIn(this.email || '', this.password || '')}/>
      <Text style={styles.changePageText} onPress={() => pushPage('signup')}>or sign up now</Text>
    </View>
  </Image>
)
