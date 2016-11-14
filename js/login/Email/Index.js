'use strict';

import React from 'React';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import {BackAndroid, Navigator, Text} from 'react-native';

export default class Index extends React.Component {
  constructor() {
    super();
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

  pushPage(page) {
    this.refs.navigator.push({page});
  }

  goBack() {
    this.refs.navigator.pop();
  }
}
