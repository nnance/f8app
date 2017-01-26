'use strict';

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import {NavBarWithButton} from '../../../common/NavBar';
export {HEIGHT} from '../../../common/NavBar';
import {colors} from '../../../common/styles';

export default class NavBar extends React.Component {
  render() {
    return (
      <NavBarWithButton
        {...this.props}
        />
    );
  }
}
