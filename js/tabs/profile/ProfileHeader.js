import React from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

import ProfilePicture from '../../common/ProfilePicture';

class ProfileHeader extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Image source={require('../maps/img/maps-background.png')} style={styles.header}>
          <ProfilePicture size={100} userID={this.props.user.id} />
          {this.props.children}
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: undefined
  }
});

export default ProfileHeader;
