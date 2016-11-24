'use strict';

import React from 'react';
import {BackAndroid, Text, TouchableOpacity, Navigator, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';

import * as actions from '../actions';

import IndexScreen from './IndexScreen';
import EmailLoginScreen from './EmailLoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import SuccessScreen from './SuccessScreen';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.goToLogin = this.goToLogin.bind(this);
    this.pushPage = this.pushPage.bind(this);
    this.goBack = this.goBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    this.props.clearError();
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{page: 'index'}}
        renderScene={this.renderScene}
        navigationBar={
         <Navigator.NavigationBar
           routeMapper={{
             LeftButton: (route, navigator, index, navState) => {
               if (route.page === 'index') return null;
               return (
                 <TouchableOpacity onPress={this.goBack}>
                  <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                    {'<'}
                  </Text>
                 </TouchableOpacity>
               );
             },
             RightButton: (route, navigator, index, navState) => {
               if (route.page !== 'index') return null;
               return (
                 <TouchableOpacity
                   accessibilityLabel="Skip login"
                   accessibilityTraits="button"
                   style={styles.skip}
                   onPress={() => this.props.skipLogin()}>
                   <Image
                     source={require('./img/x.png')}
                   />
                 </TouchableOpacity>
               );
             },
             Title: (route, navigator, index, navState) => null
           }}
         />
        }
      />
    );
  }

  renderScene(route, navigator) {
    if (route.page === 'index') {
      return <IndexScreen {...this.props} pushPage={this.pushPage}/>;
    }
    if (route.page === 'email-login') {
      return <EmailLoginScreen error={this.props.error} logIn={this.props.logIn} pushPage={this.pushPage}/>;
    }
    if (route.page === 'signup') {
      return (<SignupScreen
        error={this.props.error}
        signUp={this.props.signUp}
        pushPage={this.pushPage}
        goBack={this.goBack}
        clearSignedUp={this.props.clearSignedUp}
        isSignedUp={this.props.isSignedUp}
      />);
    }
    if (route.page === 'forgotPassword') {
      return (<ForgotPasswordScreen
        error={this.props.error}
        clearIsReqedForgotPassword={this.props.clearIsReqedForgotPassword}
        isReqedForgotPassword={this.props.isReqedForgotPassword}
        forgotPassword={this.props.forgotPassword}
        pushPage={this.pushPage}
        goBack={this.goBack}
      />);
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
    if (this.props.onExit) {
      this.props.onExit();
      return true;
    }
    return false;
  }

  goToLogin() {
    this.props.clearError();
    const navigator = this.refs.navigator;
    let currentRoutes = navigator.getCurrentRoutes();
    let N = navigator.getCurrentRoutes().length;
    while(N) {
      if (currentRoutes[N-1].page === 'email-login') {
        break;
      }
      N--;
    }
    if (N <= 0) {
      throw Error('email-login route not found');
    }
    navigator.popN(navigator.getCurrentRoutes().length - N);
  }

  pushPage(page, payload) {
    this.props.clearError();
    this.props.clearIsReqedForgotPassword();
    this.props.clearSignedUp();
    this.refs.navigator.push({page, payload});
  }

  goBack() {
    this.props.clearError();
    this.refs.navigator.pop();
  }

}

const select = state => ({
  isLoggedIn: state.user.isLoggedIn,
  isSignedUp: state.user.isSignedUp,
  isReqedForgotPassword: state.user.isReqedForgotPassword,
  error: state.user.loginError
});

const actionsMaping = {
  skipLogin: actions.skipLogin,
  clearError: actions.clearError,
  logIn: actions.logIn,
  signUp: actions.signUp,
  forgotPassword: actions.forgotPassword,
  clearSignedUp: actions.clearSignedUp,
  clearIsReqedForgotPassword: actions.clearIsReqedForgotPassword
};

var styles = StyleSheet.create({
  skip: {
    padding: 15,
  },
});

module.exports = connect(select, actionsMaping)(LoginScreen);
