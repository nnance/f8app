/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule F8Navigator
 * @flow
 */


import LoginScreen from './login/LoginScreen';

const React = require('React');
const Platform = require('Platform');
const BackAndroid = require('BackAndroid');
const F8TabsView = require('F8TabsView');
const FriendsScheduleView = require('./tabs/schedule/FriendsScheduleView');
const FilterScreen = require('./filter/FilterScreen');
const LoginModal = require('./login/LoginModal');
const Navigator = require('Navigator');
const SessionsCarousel = require('./tabs/schedule/SessionsCarousel');
const SharingSettingsModal = require('./tabs/schedule/SharingSettingsModal');
const SharingSettingsScreen = require('./tabs/schedule/SharingSettingsScreen');
const ThirdPartyNotices = require('./tabs/info/ThirdPartyNotices');
const RatingScreen = require('./rating/RatingScreen');
const StyleSheet = require('StyleSheet');
const { connect } = require('react-redux');
const { switchTab } = require('./actions');

const F8Navigator = React.createClass({
  _handlers: ([]: Array<() => boolean>),

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  },

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  },

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  },

  addBackButtonListener(listener) {
    this._handlers.push(listener);
  },

  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter(handler => handler !== listener);
  },

  handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const { navigator } = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    if (this.props.tab !== 'schedule') {
      this.props.dispatch(switchTab('schedule'));
      return true;
    }
    return false;
  },

  render() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
          if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
          // TODO: Proper scene support
          if (route.shareSettings || route.friend) {
            return Navigator.SceneConfigs.FloatFromRight;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
        initialRoute={{}}
        renderScene={this.renderScene}
      />
    );
  },

  renderScene(route, navigator) {
    if (route.allSessions) {
      return (
        <SessionsCarousel
          {...route}
          navigator={navigator}
        />
      );
    }
    if (route.session) {
      return (
        <SessionsCarousel
          session={route.session}
          navigator={navigator}
        />
      );
    }
    if (route.filter) {
      return (
        <FilterScreen navigator={navigator} />
      );
    }
    if (route.friend) {
      return (
        <FriendsScheduleView
          friend={route.friend}
          navigator={navigator}
        />
      );
    }
    if (route.login) {
      return (
        <LoginModal
          navigator={navigator}
          onLogin={route.callback}
        />
      );
    }
    if (route.share) {
      return (
        <SharingSettingsModal navigator={navigator} />
      );
    }
    if (route.shareSettings) {
      return <SharingSettingsScreen navigator={navigator} />;
    }
    if (route.rate) {
      return <RatingScreen navigator={navigator} surveys={route.surveys} />;
    }
    if (route.notices) {
      return <ThirdPartyNotices navigator={navigator} />;
    }
    if (route.logInWithEmail) {
      return <LoginScreen withEmail onExit={() => navigator.pop()} addBackButtonListener={this.addBackButtonListener} removeBackButtonListener={this.removeBackButtonListener} />;
    }
    return <F8TabsView navigator={navigator} />;
  },
});

F8Navigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

function select(store) {
  return {
    tab: store.navigation.tab,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

module.exports = connect(select)(F8Navigator);
