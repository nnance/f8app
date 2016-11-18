'use strict';

import React from 'React';
import {ScrollView, View, Text, TextInput, Image} from 'react-native';
import InteractionManager from 'InteractionManager';
import F8Button from 'F8Button';

import styles from './styles';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    const {error, signUp, goBack} = this.props;
    if (this.state.loading) {
      return (
        <Image
          style={styles.container}
          source={require('../img/login-background.png')}>
          <Text>
            Loading
          </Text>
        </Image>
      );
    }
    return (
      <Image
        style={styles.container}
        source={require('../img/login-background.png')}>
        <View style={styles.inputSession}>
          <Text style={styles.errorText}>
            {error}
          </Text>
          <TextInput
            onChangeText={(email) => this.email = email}
            style={styles.input}
            placeholder='email'/>
          <TextInput
            onChangeText={(password) => this.password = password}
            style={styles.input}
            secureTextEntry={true}
            placeholder='password'/>
          <TextInput
            onChangeText={(confirmPassword) => this.confirmPassword = confirmPassword}
            style={styles.input}
            secureTextEntry={true}
            placeholder='confirm password'/>
        </View>
        <View style={styles.buttonSession}>
          <F8Button
            caption='Signup'
            onPress={() => signUp(this.email || '', this.password || '', this.confirmPassword || '')}/>
          <Text
            style={styles.changePageText}
            onPress={() => goBack()}>
            or back to login
          </Text>
        </View>
      </Image>
    )
  }
}
