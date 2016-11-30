import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ListView,
  TouchableOpacity
} from 'react-native';

import NavBar from './NavBar';

import PureListView from '../../common/PureListView';
import ProfilePicture from '../../common/ProfilePicture';

const addIcon = require('./img/icons/myfan.png');
const blockIcon = require('./img/icons/logout.png');

const UnfollowButton = (props) => (<View style={styles.unfollowButton}>
  <Text style={styles.unfollowText}>
    เลิกติดตาม
  </Text>
</View>);

const FollowButton = (props) => (<View style={styles.followButton}>
  <Text style={styles.followText}>
    ติดตาม
  </Text>
</View>);

const FollowerDetail = (props) => (<View style={styles.followerDetail}>
  {
    props.addButton ?
      <Image style={styles.followerIconDetail} source={addIcon} /> :
      <Image style={styles.followerIconDetail} source={blockIcon} />
  }
  <View>
    {
      props.followButton ?
        <FollowButton/> :
        <UnfollowButton/>
    }
  </View>
</View>);

export default class UserContainer extends React.Component {
  render() {
    const title = `กำลังติดตาม`;
    return (
      <View style={styles.container}>
        <NavBar title={title}>
        </NavBar>
        <PureListView
          data={this.props.userList}
          renderRow={(user, i, ii) => {
            return (<View style={styles.rowContainer}>
              <View style={styles.profile}>
                <ProfilePicture size={40}/>
              </View>
              <Text style={styles.name}>
                {Number(ii) + 1}. {user.name}
              </Text>
              <View style={styles.detail}>
                <FollowerDetail/>
              </View>
            </View>);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  detail: {
    flex: 1,
    paddingRight: 20,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  rowContainer: {
    backgroundColor: 'rgb(250, 250, 250)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    padding: 10
  },
  profile: {
    margin: 10
  },
  unfollowButton: {
    padding: 4,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(190, 190, 190, 0.8)'
  },
  unfollowText: {
    color: 'white',
    fontSize: 13
  },
  followButton: {
    padding: 4,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgb(141, 227, 188)'
  },
  followText: {
    color: 'rgb(141, 227, 188)',
    fontSize: 13
  },
  followerDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  followerIconDetail: {
    height: 20,
    width: 20,
    marginRight: 10
  }
});
