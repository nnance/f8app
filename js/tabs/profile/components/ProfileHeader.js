import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import ProfilePicture from '../../../common/ProfilePicture';
import ProfileCover from './ProfileCover';

class ProfileHeader extends React.Component {
  render() {
    return (
      <ProfileCover customSource={this.props.customCoverSource} user={this.props.user} style={styles.headerBackground}>
        <View style={styles.header}>
          <ProfilePicture size={100} user={this.props.user} customSource={this.props.customSource} />
          {this.props.children}
        </View>
      </ProfileCover>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: undefined,
    width: undefined,
    paddingVertical: 10,
  },
  headerBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    height: undefined,
    width: undefined,
  },
});

export default ProfileHeader;
