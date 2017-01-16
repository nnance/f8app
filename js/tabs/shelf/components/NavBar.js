'use strict';

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import DefaultNavBar from '../../../common/NavBar';
import {colors} from '../../../common/styles';

export default class NavBar extends React.Component {
  render() {
    return (
      <DefaultNavBar
        {...this.props}
        renderLeftMenu={this.props.renderLeftMenu ? this.props.renderLeftMenu : this.renderBackButton.bind(this)}
        />
    );
  }

  renderBackButton() {
    return (
      <TouchableOpacity onPress={this.props.onBackPress}><Image style={{height: 20, resizeMode: 'contain'}} source={require('../img/backButton.png')}/></TouchableOpacity>
    );
  }
}
