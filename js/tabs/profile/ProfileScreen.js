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
import PureListView from '../../common/PureListView';
import ProfilePicture from '../../common/ProfilePicture';
import {toHumanNumber} from '../../common/utils';

import {FollowingScreen, FollowerScreen, MyFanScreen} from './UserContainer';

const menuList = [
  {
    name: 'bookmark',
    icon: require('./img/icons/bookmark.png'),
    title: 'Bookmark'
  },
  {
    name: 'myclog',
    icon: require('./img/icons/myclog.png'),
    title: 'Clog ของฉัน'
  },
  {
    name: 'myfan',
    icon: require('./img/icons/myfan.png'),
    title: 'แฟนคลับของฉัน'
  },
  {
    name: 'candyShop',
    icon: require('./img/icons/candy-shop.png'),
    title: 'Candy Shop'
  },
  {
    name: 'activity',
    icon: require('./img/icons/activity.png'),
    title: 'กิจกรรม'
  },
  {
    name: 'logout',
    icon: require('./img/icons/logout.png'),
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
      source={require('./img/icons/candy.png')}
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
    const mockUser = [{name: 'Art Nattapat'}, {name: 'Art Art Art'}, {name: 'Art Art Art'}, {name: 'Art Art Art'}, {name: 'Art Art Art'}, {name: 'Art Art Art'}];
    if (route.page === 'following') {
      return <FollowingScreen userList={mockUser} onBackPress={() => navigator.pop()}/>
    }
    if (route.page === 'follower') {
      return <FollowerScreen userList={mockUser} onBackPress={() => navigator.pop()}/>
    }
    if (route.page === 'myfan') {
      return <MyFanScreen userList={mockUser} onBackPress={() => navigator.pop()}/>
    }
    return <ProfileScreen
      onMenuPress={this.onMenuPress}
      onFollowingPress={() => navigator.push({page: 'following'})}
      onFollowerPress={() => navigator.push({page: 'follower'})}
      />;
  }

  onMenuPress(name) {
    const navigator = this.refs.navigator;
    if (name === 'myfan') {
      navigator.push({page: 'myfan'})
    }
  }
}

class _ProfileScreen extends React.Component {
  render() {
    const name = this.props.user.name || '';
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../maps/img/maps-background.png')} style={styles.header}>
            <ProfilePicture size={100} userID={this.props.user.id} />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {name.toUpperCase()}
              </Text>
              <Image
                style={{
                  marginLeft: 10,
                  height: 20,
                  width: 20
                }}
                source={require('./img/icons/edit-profile.png')}
                />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <NumberDetail title='ผู้ติดตาม' number={this.props.followerCount} borderRight={true} onPress={() => this.props.onFollowerPress && this.props.onFollowerPress()}/>
              <NumberDetail title='กำลังติดตาม' number={this.props.followingCount} borderRight={true} onPress={() => this.props.onFollowingPress && this.props.onFollowingPress()}/>
              <NumberDetail title='Candys' number={this.props.candys} onPress={() => this.props.onCandyPress && this.props.onCandyPress()}/>
            </View>
          </Image>
        </View>
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

const select = state => ({
  user: state.user,
  followingCount: 432,
  followerCount: 1249,
  candys: 1890
});

const ProfileScreen = connect(select)(_ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuList: {
    flex: 2,
    backgroundColor: 'white'
  },
  row: {
    padding: 20,
    flex: 1,
    flexDirection: 'row'
  },
  menuIcon: {
    width: 20,
    height: 20
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
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 5
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

export default NavigatorProfile;
