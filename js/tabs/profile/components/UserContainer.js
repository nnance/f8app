import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import FixBugPureListView from '../../../common/FixBugPureListView';
import ProfilePicture from '../../../common/ProfilePicture';
import { toHumanNumber } from '../../../common/utils';
import { FollowButton, UnfollowButton } from '../../../common/BasicButton';

import NavBar from './NavBar';
import { styles as commonStyles } from '../common';

/* eslint react/no-multi-comp: off */

const addIcon = require('../../../assets/profile-icon/add.png');
const blockIcon = require('../../../assets/profile-icon/block.png');

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    paddingRight: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rowContainer: {
    backgroundColor: 'rgb(250, 250, 250)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    padding: 10,
  },
  profile: {
    margin: 10,
  },
  unfollowButton: {
    padding: 4,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(190, 190, 190, 0.8)',
  },
  unfollowText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
    width: 60,
  },
  followButton: {
    padding: 4,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgb(141, 227, 188)',
  },
  followText: {
    textAlign: 'center',
    color: 'rgb(141, 227, 188)',
    fontSize: 13,
    width: 60,
  },
  followerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followerIconDetail: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  candyPointDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  candyPointBox: {
    alignItems: 'center',
  },
  candyPointText: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.3)',
  },
  candyPoint: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  candyPointHighLight: {
    color: 'rgb(141, 227, 188)',
  },
  candyPointIconLevel: {
    height: 20,
    width: 40,
    marginRight: 20,
    resizeMode: 'contain',
  },
});

const FollowerDetail = props => (<View style={styles.followerDetail}>
  {
    props.addButton ?
      <Image style={styles.followerIconDetail} source={addIcon} /> :
      <Image style={styles.followerIconDetail} source={blockIcon} />
  }
  <View>
    {
      !props.following ?
        <FollowButton /> :
        <UnfollowButton />
    }
  </View>
</View>);

const crownIconLevel = {
  1: require('../../../assets/profile-icon/crown-1.png'),
  2: require('../../../assets/profile-icon/crown-2.png'),
  3: require('../../../assets/profile-icon/crown-3.png'),
};

const CandyPointDetail = props => (<View style={styles.candyPointDetail}>
  {
    props.icon !== null ?
      <Image style={styles.candyPointIconLevel} source={crownIconLevel[props.icon]} />
    : null
  }
  <View style={styles.candyPointBox}>
    <Text style={[styles.candyPoint, props.highLight ? styles.candyPointHighLight : null]}>
      {toHumanNumber(props.candys)}
    </Text>
    <Text style={styles.candyPointText}>
      Candys Point
    </Text>
  </View>
</View>);

export default class UserContainer extends React.Component {
  render() {
    return (
      <View style={commonStyles.listViewContainer}>
        <NavBar
          title={this.props.title}
          onBackPress={this.props.onBackPress}
        />
        <FixBugPureListView
          data={this.props.userList}
          renderRow={(user, i, idx) => (<View style={styles.rowContainer}>
            <View style={styles.profile}>
              <ProfilePicture size={40} />
            </View>
            <Text style={styles.name}>
              {Number(idx) + 1}. {user.name}
            </Text>
            <View style={styles.detail}>
              {
                  this.props.renderDetail(user, idx)
                }
            </View>
          </View>)}
        />
      </View>
    );
  }
}

export class FollowingScreen extends React.Component {
  render() {
    return (
      <UserContainer
        {...this.props} title={'กำลังติดตาม'}
        renderDetail={() => <UnfollowButton />}
      />
    );
  }
}

export class MyFanScreen extends React.Component {
  render() {
    return (
      <UserContainer
        {...this.props} title={'แฟนคลับของฉัน'}
        renderDetail={
          (user, idx) =>
            <CandyPointDetail
              icon={idx < 3 ? Number(idx) + 1 : null}
              candys={user.candys}
              highLight={idx < 3}
            />
        }
      />
    );
  }
}

export class FollowerScreen extends React.Component {
  render() {
    return (
      <UserContainer
        {...this.props}
        title={'ผู้ติดตาม'}
        renderDetail={
          user =>
            <FollowerDetail
              addButton={user.following}
              following={user.following}
            />
        }
      />
    );
  }
}
