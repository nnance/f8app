'use strict';

import React from 'React';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import SuccessScreen from './SuccessScreen';
import {BackAndroid, Navigator, Text} from 'react-native';

export default class Index extends React.Component {
  constructor() {
    super();
    this.goToLogin = this.goToLogin.bind(this);
    this.pushPage = this.pushPage.bind(this);
    this.goBack = this.goBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{page: 'login'}}
        renderScene={this.renderScene}
      />
    );
  }

  renderScene(route, navigator) {
    if (route.page === 'login') {
      return <LoginScreen pushPage={this.pushPage}/>;
    }
    if (route.page === 'signup') {
      return <SignupScreen pushPage={this.pushPage} goBack={this.goBack}/>;
    }
    if (route.page === 'forgotPassword') {
      return <ForgotPasswordScreen pushPage={this.pushPage} goBack={this.goBack}/>;
    }
    if (route.page === 'success') {
      return <SuccessScreen successText={route.payload.successText} goToLogin={this.goToLogin}/>;
    }
    return <Text>Page not found</Text>;
  }

  handleBackButton() {
    const navigator = this.refs.navigator;
    if (navigator && navigator.getCurrentRoutes().length > 1 ) {
      navigator.pop();
      return true;
    }
    return false;
  }

  goToLogin() {
    const navigator = this.refs.navigator;
    let N = navigator.getCurrentRoutes().length;
    while(N-- > 1) {
      navigator.pop();
    }
  }

  pushPage(page, payload) {
    this.refs.navigator.push({page, payload});
  }

  goBack() {
    this.refs.navigator.pop();
  }
}
