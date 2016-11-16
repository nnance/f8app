'use strict';

import React from 'React';
import {Image, View, Text, TextInput} from 'react-native';
import F8Button from 'F8Button';
import {connect} from 'react-redux';
import {actions, selector} from '../../../web/features/auth';

import styles from './styles';

class SuccessScreen extends React.Component {
  render() {
    return (
      <Image
        style={styles.container}
        source={require('../img/login-background.png')}>
        <View style={styles.inputSession}>
          <Text style={styles.successText} onPress={() => this.props.goToLogin()}>{this.props.successText}, go back to login</Text>
        </View>
      </Image>
    )
  }
}

export default SuccessScreen;
