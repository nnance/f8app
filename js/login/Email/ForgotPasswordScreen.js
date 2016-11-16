'use strict';

import React from 'React';
import {Image, View, Text, TextInput} from 'react-native';
import F8Button from 'F8Button';
import {connect} from 'react-redux';
import {actions, selector} from '../../../web/features/auth';

import styles from './styles';

export default ({error, forgotPassword, goBack}) => (
  <Image
    style={styles.container}
    source={require('../img/login-background.png')}>
    <View style={styles.inputSession}>
      <Text style={styles.errorText}>{error}</Text>
      <TextInput onChangeText={(email) => this.email = email} style={styles.input} placeholder='email'/>
    </View>
    <View style={styles.buttonSession}>
      <F8Button caption='Forgot password' onPress={() => forgotPassword(this.email || '')}/>
      <Text style={styles.changePageText} onPress={() => goBack()}>or back to login</Text>
    </View>
  </Image>
)
