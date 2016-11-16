'use strict';

import React from 'React';
import {Image, View, Text, TextInput} from 'react-native';
import F8Button from 'F8Button';
import {connect} from 'react-redux';
import {actions, selector} from '../../../web/features/auth';

import styles from './styles';

export default ({goToLogin, successText}) => (
  <Image
    style={styles.container}
    source={require('../img/login-background.png')}>
    <View style={styles.inputSession}>
      <Text style={styles.successText} onPress={() => goToLogin()}>{successText}, go back to login</Text>
    </View>
  </Image>
)
