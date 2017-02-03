import {connect} from 'react-redux';
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
import {FollowingScreen, FollowerScreen, MyFanScreen} from '../components/UserContainer';
import ActivityScreen from '../components/ActivityScreen';
import MyClogScreen from '../components/MyClogScreen';
import BookmarkScreen from '../components/BookmarkScreen';
import JellyShopScreen from '../components/JellyShopScreen';
import Home from '../components/Home';
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
      return <FollowingScreen {...this.props} userList={this.props.following} onBackPress={onBack}/>;
    }
    if (route.page === 'follower') {
      return <FollowerScreen {...this.props} userList={this.props.follower} onBackPress={onBack}/>;
    }
    if (route.page === 'myfan') {
      return <MyFanScreen {...this.props} userList={this.props.myFan} onBackPress={onBack}/>;
    }
    if (route.page === 'activity') {
      return <ActivityScreen {...this.props} onBackPress={onBack}/>;
    }
    if (route.page === 'myclog') {
      return <MyClogScreen title="My Clog" clogs={mockData.myClogs} {...this.props} onBackPress={onBack}/>;
    }
    if (route.page === 'bookmark') {
      return <BookmarkScreen {...this.props} onBackPress={onBack}/>;
    }
    if (route.page === 'jellyShop') {
      return <JellyShopScreen {...this.props} onBackPress={onBack}/>;
    }
    if (route.page === 'edit-profile') {
      return <ProfileEditorScreen
        {...this.props}
        goToChangeEmail={this.goToChangeEmail.bind(this)}
        goToChangePassword={this.goToChangePassword.bind(this)}
        onBackPress={onBack}/>;
    }
    if (route.page === 'change-email') {
      return <ChangeEmailScreen {...this.props} onBackPress={onBack}/>;
    }
    if (route.page === 'change-password') {
      return <ChangePasswordScreen {...this.props} onBackPress={onBack}/>;
    }
    return <Home
      {...this.props}
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

export default connect(select)(ProfileNavigator);
export {
  ProfileNavigator as Component
};
