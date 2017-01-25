'use strict';

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
import ProfileEditorScreen from '../containers/ProfileEditorScreen';
import ChangeEmailScreen from '../containers/ChangeEmailScreen';
import ChangePasswordScreen from '../containers/ChangePasswordScreen';

import * as mockData from '../mockData';

const menuList = [
  {
    name: 'bookmark',
    icon: require('../img/icons/bookmark.png'),
    title: 'Bookmark'
  },
  {
    name: 'myclog',
    icon: require('../img/icons/myclog.png'),
    title: 'Clog ของฉัน'
  },
  {
    name: 'myfan',
    icon: require('../img/icons/myfan.png'),
    title: 'แฟนคลับของฉัน'
  },
  {
    name: 'jellyShop',
    icon: require('../img/icons/candy-shop.png'),
    title: 'Jelly Shop'
  },
  {
    name: 'activity',
    icon: require('../img/icons/activity.png'),
    title: 'กิจกรรม'
  },
  {
    name: 'logout',
    icon: require('../img/icons/logout.png'),
    title: 'Logout'
  }
];

const NumberDetail = (props) => {
  return (
    <TouchableOpacity style={[styles.numberDetail, {borderRightWidth: props.borderRight ? 1 : 0}]} onPress={() => props.onPress && props.onPress()}>
      <View style={styles.headNumberDetail}>
        <Text style={styles.smallText}>
          {toHumanNumber(props.number)}
        </Text>
      </View>
      <Text style={styles.smallText}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const CandyCorner = (props) => (
  <View style={{
    position: 'absolute',
    left: 0,
    top: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <Image
      source={require('../img/icons/candy.png')}
      style={{
        width: 15,
        height: 15,
        marginLeft: 5,
        marginRight: 5
      }}
      />
    <View style={{
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white'
      }}>
      <Text style={{color: 'white', fontSize: 13}}>{toHumanNumber(props.candys)}</Text>
    </View>
  </View>
);

class NavigatorProfile extends React.Component {
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
      return <ProfileEditorScreen navigator={this.refs.navigator} {...this.props} onBackPress={onBack}/>;
    }
    if (route.page === 'change-email') {
      return <ChangeEmailScreen {...this.props} onBackPress={onBack}/>;
    }
    if (route.page === 'change-password') {
      return <ChangePasswordScreen {...this.props} onBackPress={onBack}/>;
    }
    return <ProfileMenuScreen
      {...this.props}
      onMenuPress={this.onMenuPress}
      onFollowingPress={this.pushPage.bind(this, navigator, 'following')}
      onFollowerPress={this.pushPage.bind(this, navigator, 'follower')}
      onEditProfile={this.pushPage.bind(this, navigator, 'edit-profile')}
      />;
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

  pushPage(navigator, page) {
    navigator.push({page})
  }
}

class ProfileMenuScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.renderMenu = this.renderMenu.bind(this);
  }

  render() {
    const name = this.props.user.name || '';
    return (
      <View style={styles.container}>
        <ProfileHeader user={this.props.user}>
          <View style={styles.nameContainer}>
            <Text numberOfLines={1} style={styles.name}>
              {name.toUpperCase()}
            </Text>
            <TouchableOpacity onPress={() => this.props.onEditProfile && this.props.onEditProfile()}>
              <Image
                style={{
                  marginLeft: 10,
                  height: 20,
                  width: 20,
                  backgroundColor: 'transparent'
                }}
                source={require('../img/icons/edit-profile.png')}
                />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <NumberDetail title="ผู้ติดตาม" number={this.props.follower.length} borderRight={true} onPress={() => this.props.onFollowerPress && this.props.onFollowerPress()}/>
            <NumberDetail title="กำลังติดตาม" number={this.props.following.length} borderRight={true} onPress={() => this.props.onFollowingPress && this.props.onFollowingPress()}/>
            <NumberDetail title="Candys" number={this.props.candys} onPress={() => this.props.onCandyPress && this.props.onCandyPress()}/>
          </View>
        </ProfileHeader>
        <View style={styles.menuList}>
          <FixBugScrollView>
            <PureListView
              minContentHeight={0}
              title="Profile"
              data={menuList}
              renderRow={this.renderMenu}
            />
          </FixBugScrollView>
        </View>
        <CandyCorner candys={this.props.candys} />
      </View>
    );
  }

  renderMenu(menu) {
    return (<TouchableOpacity title={menu.name} onPress={this.props.onMenuPress ? this.props.onMenuPress.bind(this, menu.name) : null}>
      <View style={styles.row}>
        <Image style={styles.menuIcon} source={menu.icon}/>
        <Text style={styles.menuText}>{menu.title}</Text>
      </View>
    </TouchableOpacity>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuList: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    padding: 15,
    flex: 1,
    flexDirection: 'row'
  },
  menuIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  menuText: {
    paddingLeft: 20
  },
  nameContainer: {
    width: 200,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  smallText: {
    color: 'white',
    fontWeight: 'bold'
  },
  headNumberDetail: {
    minWidth: 60,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 5,
    alignItems: 'center'
  },
  whiteLine: {
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    height: 10
  },
  numberDetail: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  }
});

const select = state => ({
  ...mockData,
  user: state.user
});

export default connect(select)(NavigatorProfile);
export {
  NavigatorProfile as Component,
  ProfileMenuScreen
};
