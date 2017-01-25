'use strict';

import React from 'react';
import {BackAndroid, Text, TouchableOpacity, Navigator, Image, View} from 'react-native';
import {connect} from 'react-redux';

import * as actions from '../actions';

import IndexScreen from './IndexScreen';
import EmailLoginScreen from './EmailLoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import SuccessScreen from './SuccessScreen';
import styles from './styles';

const titles = {
  'index': '',
  'email-login': 'ลงชื่อเข้าใช้ผ่านอีเมล',
  'signup': 'สร้างบัญชีใหม่',
  'forgotPassword': 'ขอรหัสผ่านใหม่',
  'success': ''
};

class LoginScreen extends React.Component {
  constructor(args) {
    super(...args);
    this.goToLogin = this.goToLogin.bind(this);
    this.pushPage = this.pushPage.bind(this);
    this.goBack = this.goBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.logInWithFacebook = this.logInWithFacebook.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    if (this.props.addBackButtonListener) {
      this.props.addBackButtonListener(this.alwaysFalse);
    }
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    if (this.props.removeBackButtonListener) {
      this.props.removeBackButtonListener(this.alwaysFalse);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.props.onExit && this.props.onExit();
    }
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{page: this.props.withEmail ? 'email-login' : 'index'}}
        renderScene={this.renderScene}
        navigationBar={
         <Navigator.NavigationBar
           navigationStyles={Navigator.NavigationBar.StylesIOS}
           routeMapper={{
             LeftButton: this.renderLeftButton.bind(this),
             RightButton: this.renderRightButton.bind(this),
             Title: this.renderTitle.bind(this)
           }}
         />
        }
      />
    );
  }

  renderTitle(route, navigator, index, navState) {
    let title = '';
    title = titles[route.page];
    return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.titleNavBar}>{title}</Text></View>);
  }

  renderLeftButton(route, navigator, index, navState) {
    if (route.page === 'index'){
      return null;
    }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={this.goBack}>
         <Image style={styles.backButton} source={require('../common/img/icon/backButton.png')}/>
        </TouchableOpacity>
      </View>
    );
  }

  renderRightButton(route, navigator, index, navState) {
    if (route.page !== 'index'){
      return null;
    }
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
        logIn={this.props.logIn}
        goBack={this.goBack}
        logInWithFacebook={this.logInWithFacebook}
      />);
    }
    if (route.page === 'forgotPassword') {
      return (<ForgotPasswordScreen
        error={this.props.error}
        forgotPassword={this.props.forgotPassword}
        goBack={this.goBack}
        onReqed={() => this.pushPage('success', {successText: 'mail has been sent'})}
      />);
    }
    if (route.page === 'success') {
      return <SuccessScreen successText={route.payload.successText} goToLogin={this.goToLogin}/>;
    }
    return <Text>Page not found</Text>;
  }

  alwaysFalse() {
    return false;
  }

  goToLogin() {
    const navigator = this.refs.navigator;
    let currentRoutes = navigator.getCurrentRoutes();
    let N = navigator.getCurrentRoutes().length;
    while (N){
      if (currentRoutes[N - 1].page === 'email-login') {
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
    this.refs.navigator.push({page, payload});
  }

  goBack() {
    if (this.refs.navigator.getCurrentRoutes().length > 1) {
      this.refs.navigator.pop();
      return true;
    }
    else {
      if (this.props.onExit) {
        this.props.onExit();
        return true;
      }
    }
    return false;
  }

  async logInWithFacebook() {
    const {dispatch, onLoggedIn} = this.props;

    try {
      await dispatch(actions.logInWithFacebook());
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
      return;
    } finally {

    }

    onLoggedIn && onLoggedIn();
  }

}

const select = state => ({
  isLoggedIn: state.user.isLoggedIn,
  isSignedUp: state.user.isSignedUp,
  error: state.user.loginError
});

const actionsMaping = {
  skipLogin: actions.skipLogin,
  logIn: actions.logIn,
  signUp: actions.signUp,
  forgotPassword: actions.forgotPassword
};

export default connect()(connect(select, actionsMaping)(LoginScreen));
export {
  LoginScreen as Component
};
