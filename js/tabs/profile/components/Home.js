import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PureListView from '../../../common/PureListView';
import FixBugScrollView from '../../../common/FixBugScrollView';
import { toHumanNumber } from '../../../common/utils';

import ProfileHeader from './ProfileHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuList: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
  },
  menuIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  menuText: {
    paddingLeft: 20,
  },
  nameContainer: {
    width: 200,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  smallText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headNumberDetail: {
    minWidth: 60,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 5,
    alignItems: 'center',
  },
  whiteLine: {
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    height: 10,
  },
  numberDetail: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});

const menuList = [
  {
    name: 'bookmark',
    icon: require('../../../assets/profile-icon/bookmark.png'),
    title: 'Bookmark',
  },
  {
    name: 'myclog',
    icon: require('../../../assets/profile-icon/myclog.png'),
    title: 'Clog ของฉัน',
  },
  {
    name: 'myfan',
    icon: require('../../../assets/profile-icon/myfan.png'),
    title: 'แฟนคลับของฉัน',
  },
  {
    name: 'jellyShop',
    icon: require('../../../assets/profile-icon/candy-shop.png'),
    title: 'Jelly Shop',
  },
  {
    name: 'activity',
    icon: require('../../../assets/profile-icon/activity.png'),
    title: 'กิจกรรม',
  },
  {
    name: 'logout',
    icon: require('../../../assets/profile-icon/logout.png'),
    title: 'Logout',
  },
];

const NumberDetail = props => (
  <TouchableOpacity
    style={[styles.numberDetail, { borderRightWidth: props.borderRight ? 1 : 0 }]}
    onPress={() => props.onPress && props.onPress()}
  >
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

const CandyCorner = props => (
  <View
    style={{
      position: 'absolute',
      left: 0,
      top: 20,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Image
      source={require('../../../assets/profile-icon/candy.png')}
      style={{
        width: 15,
        height: 15,
        marginLeft: 5,
        marginRight: 5,
      }}
    />
    <View
      style={{
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
      }}
    >
      <Text style={{ color: 'white', fontSize: 13 }}>{toHumanNumber(props.candys)}</Text>
    </View>
  </View>
);

class Home extends React.Component {
  constructor(...args) {
    super(...args);
    this.renderMenu = this.renderMenu.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.logOutWithPrompt();
  }

  renderMenu(menu) {
    return (
      <TouchableOpacity
        title={menu.name}
        onPress={() => {
          if (menu.name === 'logout') {
            this.onLogout();
          } else if (this.props.onMenuPress) {
            this.props.onMenuPress(menu.name);
          }
        }}
      >
        <View style={styles.row}>
          <Image style={styles.menuIcon} source={menu.icon} />
          <Text style={styles.menuText}>{menu.title}</Text>
        </View>
      </TouchableOpacity>
    );
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
            <TouchableOpacity onPress={this.props.onEditProfile}>
              <Image
                style={{
                  marginLeft: 10,
                  height: 20,
                  width: 20,
                  backgroundColor: 'transparent',
                }}
                source={require('../../../assets/profile-icon/edit-profile.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <NumberDetail title="ผู้ติดตาม" number={this.props.followerCount} borderRight onPress={() => this.props.onFollowerPress && this.props.onFollowerPress()} />
            <NumberDetail title="กำลังติดตาม" number={this.props.followingCount} borderRight onPress={() => this.props.onFollowingPress && this.props.onFollowingPress()} />
            <NumberDetail title="Candys" number={this.props.candys} onPress={() => this.props.onCandyPress && this.props.onCandyPress()} />
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
}

export default Home;
