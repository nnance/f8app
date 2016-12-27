'use strict';

import {connect} from 'react-redux';
import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ListView,
  TouchableOpacity,
  Navigator
} from 'react-native';
import PureListView from '../../../common/PureListView';
import ProfilePicture from '../../../common/ProfilePicture';
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
]

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
}

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
)

class NavigatorProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.renderScene = this.renderScene.bind(this);
    this.onMenuPress = this.onMenuPress.bind(this);
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{page: 'profile'}}
        renderScene={this.renderScene}
        />
    );
  }

  renderScene(route, navigator) {
    if (route.page === 'following') {
      return <FollowingScreen {...this.props} userList={this.props.following} onBackPress={() => navigator.pop()}/>
    }
    if (route.page === 'follower') {
      return <FollowerScreen {...this.props} userList={this.props.follower} onBackPress={() => navigator.pop()}/>
    }
    if (route.page === 'myfan') {
      return <MyFanScreen {...this.props} userList={this.props.myFan} onBackPress={() => navigator.pop()}/>
    }
    if (route.page === 'activity') {
      return <ActivityScreen {...this.props} onBackPress={() => navigator.pop()}/>;
    }
    if (route.page === 'myclog') {
      return <MyClogScreen {...this.props} onBackPress={() => navigator.pop()}/>;
    }
    if (route.page === 'bookmark') {
      return <BookmarkScreen {...this.props} onBackPress={() => navigator.pop()}/>;
    }
    if (route.page === 'jellyShop') {
      return <JellyShopScreen {...this.props} onBackPress={() => navigator.pop()}/>;
    }
    if (route.page === 'edit-profile') {
      return <ProfileEditorScreen navigator={this.refs.navigator} {...this.props} onBackPress={() => navigator.pop()}/>;
    }
    if (route.page === 'change-email') {
      return <ChangeEmailScreen {...this.props} onBackPress={() => navigator.pop()}/>;
    }
    if (route.page === 'change-password') {
      return <ChangePasswordScreen {...this.props} onBackPress={() => navigator.pop()}/>;
    }
    return <ProfileScreen
      {...this.props}
      onMenuPress={this.onMenuPress}
      onFollowingPress={() => navigator.push({page: 'following'})}
      onFollowerPress={() => navigator.push({page: 'follower'})}
      onEditProfile={() => navigator.push({page: 'edit-profile'})}
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
}

class ProfileScreen extends React.Component {
  render() {
    const name = this.props.user.name || '';
    return (
      <View style={styles.container}>
        <ProfileHeader user={this.props.user}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
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
            <NumberDetail title='ผู้ติดตาม' number={this.props.follower.length} borderRight={true} onPress={() => this.props.onFollowerPress && this.props.onFollowerPress()}/>
            <NumberDetail title='กำลังติดตาม' number={this.props.following.length} borderRight={true} onPress={() => this.props.onFollowingPress && this.props.onFollowingPress()}/>
            <NumberDetail title='Candys' number={this.props.candys} onPress={() => this.props.onCandyPress && this.props.onCandyPress()}/>
          </View>
        </ProfileHeader>
        <View style={styles.menuList}>
          <PureListView
            title="Profile"
            renderEmptyList={() => null}
            data={menuList}
            renderRow={(menu) => (
              <TouchableOpacity onPress={() => this.props.onMenuPress && this.props.onMenuPress(menu.name)}>
                <View style={styles.row}>
                  <Image style={styles.menuIcon} source={menu.icon}/>
                  <Text style={styles.menuText}>{menu.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <CandyCorner candys={this.props.candys} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuList: {
    flex: 2,
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
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
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
