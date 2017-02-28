import React from 'react';
import FixBugScrollViewNavigator from '../../../common/FixBugScrollViewNavigator';

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
    }
    if (name === 'activity') {
      navigator.push({ page: 'activity' });
    }
    if (name === 'myclog') {
      navigator.push({ page: 'myclog' });
    }
    if (name === 'bookmark') {
      navigator.push({ page: 'bookmark' });
    }
    if (name === 'jellyShop') {
      navigator.push({ page: 'jellyShop' });
    }
  }

  onBack() {
    const navigator = this.navigator;
    navigator.pop();
  }

  goToChangeEmail() {
    this.navigator.push({ page: 'change-email' });
  }

  goToChangePassword() {
    this.navigator.push({ page: 'change-password' });
  }

  pushPage(page) {
    this.navigator.push({ page });
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
      return <BookmarkScreen onBackPress={this.onBack} redirectTo={this.props.redirectTo} />;
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
    if (route.page === 'bookmark-detail') {
      return (
        <BookmarkDetail
          id={route.id}
          onBackPress={this.onBack}
          goToPlayer={this.props.goToPlayer}
          goToBook={this.props.goToBook}
        />
      );
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

export default ProfileNavigator;
