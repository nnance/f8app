'use strict';

import React from 'React';
import {ScrollView, View, Text, TextInput, Image} from 'react-native';
import InteractionManager from 'InteractionManager';
import ClogiiButton from 'ClogiiButton';

import {DashButtonWithContainer} from './DashButton';

import styles from './styles';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSignedUp) {
      // this.props.pushPage('success', {successText: 'signed up'});
      this.props.logIn(this.state.email, this.state.password);
      this.props.clearSignedUp();
    }
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
          source={require('./img/email-bg.png')}>
          <Text>
            Loading
          </Text>
        </Image>
      );
    }
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
              placeholder='email'
              keyboardType='email-address'
              autoCapitalize='none'
              placeholderTextColor='rgba(255, 255, 255, 0.6)'
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={(password) => this.setState({password})}
              style={styles.input}
              secureTextEntry={true}
              placeholder='password'
              placeholderTextColor='rgba(255, 255, 255, 0.6)'/>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}
              style={styles.input}
              secureTextEntry={true}
              placeholder='confirm password'
              placeholderTextColor='rgba(255, 255, 255, 0.6)'/>
          </View>
          <ClogiiButton
            style={styles.emailButton}
            type='white'
            caption='สร้างบัญชี'
            onPress={() => signUp(this.state.email || '', this.state.password || '', this.state.confirmPassword || '')}/>
        </View>
        <DashButtonWithContainer caption="ลงชื่อเข้าใช้ด้วย Facebook" onPress={this.props.logInWithFacebook}/>
      </Image>
    )
  }
}
