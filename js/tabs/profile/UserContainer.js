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

const Unfollow = (props) => (<View style={styles.unfollowButton}>
  <Text style={styles.unfollowText}>
    เลิกติดตาม
  </Text>
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
                <Unfollow/>
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
    alignItems: 'flex-end'
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
  }
});
