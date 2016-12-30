import React from 'react';
import {
  Image
} from 'react-native';

const defaultCover = require('../../maps/img/maps-background.png');
// const defaultCover = require('./img/v.png');

class ProfileCover extends React.Component {
  render() {
    if (this.props.customSource) {
      return (
        <Image {...this.props} style={[{resizeMode: 'cover'}, this.props.style]} source={this.props.customSource}>
          {this.props.children}
        </Image>
      );
    }
    return (
      <Image {...this.props} style={[{resizeMode: 'cover'}, this.props.style]} source={this.props.user && this.props.user.profileCover ? {uri: this.props.user.profileCover} : defaultCover}>
        {this.props.children}
      </Image>
    );
  }
}

export default ProfileCover;
