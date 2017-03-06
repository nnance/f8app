import React from 'react';
import FixBugScrollViewNavigator from '../../../common/FixBugScrollViewNavigator';
import { withTracking } from '../../../common/navigateTracking';

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

class ProfileNavigator extends React.Component {
  constructor(...args) {
    super(...args);
    this.renderScene = this.renderScene.bind(this);
    this.onMenuPress = this.onMenuPress.bind(this);
    this.goToChangeEmail = this.goToChangeEmail.bind(this);
    this.goToChangePassword = this.goToChangePassword.bind(this);
    this.pushPage = this.pushPage.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  onMenuPress(name) {
    const navigator = this.navigator;
    if (name === 'myfan') {
      navigator.push({ page: 'myfan' });
      this.props.navigate('profile/myfan');
    }
    if (name === 'activity') {
      navigator.push({ page: 'activity' });
      this.props.navigate('profile/activity');
    }
    if (name === 'myclog') {
      navigator.push({ page: 'myclog' });
      this.props.navigate('profile/myclog');
    }
    if (name === 'bookmark') {
      navigator.push({ page: 'bookmark' });
      this.props.navigate('profile/bookmark');
    }
    if (name === 'jellyShop') {
      navigator.push({ page: 'jellyShop' });
      this.props.navigate('profile/jellyShop');
    }
  }

  onBack() {
    const navigator = this.navigator;
    this.props.navigateBack();
    navigator.pop();
  }

  goToChangeEmail() {
    this.navigator.push({ page: 'change-email' });
    this.props.navigate('profile/change-email');
  }

  goToChangePassword() {
    this.navigator.push({ page: 'change-password' });
    this.props.navigate('profile/change-password');
  }

  pushPage(page) {
    this.navigator.push({ page });
    this.props.navigate(`profile/${page}`);
  }

  renderScene(route) {
    if (route.page === 'following') {
      return <FollowingScreen onBackPress={this.onBack} />;
    }
    if (route.page === 'follower') {
      return <FollowerScreen onBackPress={this.onBack} />;
    }
    if (route.page === 'myfan') {
      return <MyFanScreen onBackPress={this.onBack} />;
    }
    if (route.page === 'activity') {
      return <ActivityScreen onBackPress={this.onBack} />;
    }
    if (route.page === 'myclog') {
      return <MyClogScreen onBackPress={this.onBack} />;
    }
    if (route.page === 'bookmark') {
      return (<BookmarkScreen
        onBackPress={this.onBack}
        redirectTo={this.props.redirectTo}
        setTabViewScrollable={this.props.setTabViewScrollable}
      />);
    }
    if (route.page === 'jellyShop') {
      return <JellyShopScreen onBackPress={this.onBack} />;
    }
    if (route.page === 'edit-profile') {
      return (<ProfileEditorScreen
        goToChangeEmail={this.goToChangeEmail}
        goToChangePassword={this.goToChangePassword}
        onBackPress={this.onBack}
      />);
    }
    if (route.page === 'change-email') {
      return <ChangeEmailScreen onBackPress={this.onBack} />;
    }
    if (route.page === 'change-password') {
      return <ChangePasswordScreen onBackPress={this.onBack} />;
    }
    return (<Home
      onMenuPress={this.onMenuPress}
      onFollowingPress={() => this.pushPage('following')}
      onFollowerPress={() => this.pushPage('follower')}
      onEditProfile={() => this.pushPage('edit-profile')}
    />);
  }

  render() {
    return (
      <FixBugScrollViewNavigator
        ref={(node) => {
          this.navigator = node;
        }}
        initialRoute={{ page: 'home' }}
        renderScene={this.renderScene}
      />
    );
  }
}

export default withTracking(ProfileNavigator);
