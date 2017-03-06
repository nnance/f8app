

import React from 'react';
import { BackAndroid, Text, TouchableOpacity, Navigator, Image, View } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { withTracking } from '../common/navigateTracking';

import IndexScreen from './IndexScreen';
import EmailLoginScreen from './EmailLoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import SuccessScreen from './SuccessScreen';
import styles from './styles';

const titles = {
  index: '',
  'email-login': 'ลงชื่อเข้าใช้ผ่านอีเมล',
  signup: 'สร้างบัญชีใหม่',
  forgotPassword: 'ขอรหัสผ่านใหม่',
  success: '',
};

class LoginScreen extends React.Component {
  constructor(args) {
    super(...args);
    this.goToLogin = this.goToLogin.bind(this);
    this.pushPage = this.pushPage.bind(this);
    this.goBack = this.goBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.logInWithFacebook = this.logInWithFacebook.bind(this);
    this.renderLeftButton = this.renderLeftButton.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderRightButton = this.renderRightButton.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    if (this.props.addBackButtonListener) {
      this.props.addBackButtonListener(this.alwaysFalse);
    }
    this.props.navigate('login');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn && this.props.onExit) {
      this.props.onExit();
    }
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    if (this.props.removeBackButtonListener) {
      this.props.removeBackButtonListener(this.alwaysFalse);
    }
  }

  alwaysFalse() {
    return false;
  }

  goToLogin() {
    const navigator = this.navigator;
    const currentRoutes = navigator.getCurrentRoutes();
    let N = navigator.getCurrentRoutes().length;
    while (N) {
      if (currentRoutes[N - 1].page === 'email-login') {
        break;
      }
      N -= 1;
    }
    if (N <= 0) {
      throw Error('email-login route not found');
    }
    navigator.popN(navigator.getCurrentRoutes().length - N);
    this.props.navigate('login');
  }

  pushPage(page, payload) {
    this.navigator.push({ page, payload });
    this.props.navigate(`login/${page}`);
  }

  goBack() {
    this.props.navigateBack();
    if (this.navigator.getCurrentRoutes().length > 1) {
      this.navigator.pop();
      return true;
    } else if (this.props.onExit) {
      this.props.onExit();
      return true;
    }
    return false;
  }

  async logInWithFacebook() {
    const { dispatch, onLoggedIn } = this.props;

    try {
      await dispatch(actions.logInWithFacebook());
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
      return;
    }

    if (onLoggedIn) {
      onLoggedIn();
    }
  }

  renderTitle(route) {
    let title = '';
    title = titles[route.page];
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={styles.titleNavBar}>{title}</Text></View>);
  }

  renderLeftButton(route) {
    if (route.page === 'index') {
      return null;
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={this.goBack}>
          <Image style={styles.backButton} source={require('../assets/common/icon/backButton.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  renderRightButton(route) {
    if (route.page !== 'index') {
      return null;
    }
    return (
      <TouchableOpacity
        accessibilityLabel="Skip login"
        accessibilityTraits="button"
        style={styles.skip}
        onPress={() => this.props.skipLogin()}
      >
        <Image
          source={require('../assets/login/x.png')}
        />
      </TouchableOpacity>
    );
  }

  renderScene(route) {
    if (route.page === 'index') {
      return <IndexScreen {...this.props} pushPage={this.pushPage} />;
    }
    if (route.page === 'email-login') {
      return (
        <EmailLoginScreen
          error={this.props.error}
          logIn={this.props.logIn}
          pushPage={this.pushPage}
        />
      );
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
        onReqed={() => this.pushPage('success', { successText: 'mail has been sent' })}
      />);
    }
    if (route.page === 'success') {
      return <SuccessScreen successText={route.payload.successText} goToLogin={this.goToLogin} />;
    }
    return <Text>Page not found</Text>;
  }

  render() {
    return (
      <Navigator
        ref={
          (node) => {
            this.navigator = node;
          }
        }
        initialRoute={{ page: this.props.withEmail ? 'email-login' : 'index' }}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            navigationStyles={Navigator.NavigationBar.StylesIOS}
            routeMapper={{
              LeftButton: this.renderLeftButton,
              RightButton: this.renderRightButton,
              Title: this.renderTitle,
            }}
          />
        }
      />
    );
  }
}

const select = state => ({
  isLoggedIn: state.user.isLoggedIn,
  isSignedUp: state.user.isSignedUp,
  error: state.user.loginError,
});

const actionsMaping = {
  skipLogin: actions.skipLogin,
  logIn: actions.logIn,
  signUp: actions.signUp,
  forgotPassword: actions.forgotPassword,
};

export default withTracking(connect()(connect(select, actionsMaping)(LoginScreen)));
export {
  LoginScreen as Component,
};
