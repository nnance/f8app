import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Navigator
} from 'react-native';
import PureListView from '../../../common/PureListView';
import FixBugScrollViewNavigator from '../../../common/FixBugScrollViewNavigator';
import FixBugScrollView from '../../../common/FixBugScrollView';
import {toHumanNumber} from '../../../common/utils';

import ProfileHeader from '../components/ProfileHeader';
import FollowerScreen from '../containers/FollowerScreen';
import FollowingScreen from '../containers/FollowingScreen';
import MyFanScreen from '../containers/MyFanScreen';
import ActivityScreen from '../containers/ActivityScreen';
import MyClogScreen from '../containers/MyClogScreen';
import BookmarkScreen from '../containers/BookmarkScreen';
import JellyShopScreen from '../components/JellyShopScreen';
import Home from '../containers/Home';
import ProfileEditorScreen from '../containers/ProfileEditorScreen';
import ChangeEmailScreen from '../containers/ChangeEmailScreen';
import ChangePasswordScreen from '../containers/ChangePasswordScreen';

import * as mockData from '../mockData';

class ProfileNavigator extends React.Component {
  constructor(...args) {
    super(...args);
    this.renderScene = this.renderScene.bind(this);
    this.onMenuPress = this.onMenuPress.bind(this);
  }

  render() {
    return (
      <FixBugScrollViewNavigator
        ref="navigator"
        initialRoute={{page: 'profile'}}
        renderScene={this.renderScene}
        />
    );
  }

  renderScene(route, navigator) {
    const onBack = this.onBack.bind(this, navigator);
    if (route.page === 'following') {
      return <FollowingScreen onBackPress={onBack}/>;
    }
    if (route.page === 'follower') {
      return <FollowerScreen onBackPress={onBack}/>;
    }
    if (route.page === 'myfan') {
      return <MyFanScreen onBackPress={onBack}/>;
    }
    if (route.page === 'activity') {
      return <ActivityScreen onBackPress={onBack}/>;
    }
    if (route.page === 'myclog') {
      return <MyClogScreen onBackPress={onBack}/>;
    }
    if (route.page === 'bookmark') {
      return <BookmarkScreen onBackPress={onBack}/>;
    }
    if (route.page === 'jellyShop') {
      return <JellyShopScreen onBackPress={onBack}/>;
    }
    if (route.page === 'edit-profile') {
      return <ProfileEditorScreen
        goToChangeEmail={this.goToChangeEmail.bind(this)}
        goToChangePassword={this.goToChangePassword.bind(this)}
        onBackPress={onBack}/>;
    }
    if (route.page === 'change-email') {
      return <ChangeEmailScreen onBackPress={onBack}/>;
    }
    if (route.page === 'change-password') {
      return <ChangePasswordScreen onBackPress={onBack}/>;
    }
    return <Home
      onMenuPress={this.onMenuPress}
      onFollowingPress={this.pushPage.bind(this, 'following')}
      onFollowerPress={this.pushPage.bind(this, 'follower')}
      onEditProfile={this.pushPage.bind(this, 'edit-profile')}
      />;
  }

  goToChangeEmail() {
    this.refs.navigator.push({page: 'change-email'});
  }

  goToChangePassword() {
    this.refs.navigator.push({page: 'change-password'});
  }

  onMenuPress(name) {
    const navigator = this.refs.navigator;
    if (name === 'myfan') {
      navigator.push({page: 'myfan'});
    }
    if (name === 'activity') {
      navigator.push({page: 'activity'});
    }
    if (name === 'myclog') {
      navigator.push({page: 'myclog'});
    }
    if (name === 'bookmark') {
      navigator.push({page: 'bookmark'});
    }
    if (name === 'jellyShop') {
      navigator.push({page: 'jellyShop'});
    }
  }

  onBack(navigator) {
    navigator.pop();
  }

  pushPage(page) {
    this.refs.navigator.push({page})
  }
}

const select = state => ({
  ...mockData,
  user: state.user
});

export default ProfileNavigator;
