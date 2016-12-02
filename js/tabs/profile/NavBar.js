'use strict';

import React from 'react';
import {
  Text,
  Platform,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {colors} from './common';

const NAV_BAR_HEIGHT = 50;

export default class NavBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftMenu} onPress={() => this.props.onLeftPress && this.props.onLeftPress()}>
          <Text style={styles.navText}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.midMenu}>
          <Text style={styles.navText}>{this.props.title}</Text>
        </View>
        <TouchableOpacity style={styles.rightMenu} onPress={() => this.props.onRightPress && this.props.onRightPress()}>
          {
            this.props.renderRightMenu ? this.props.renderRightMenu() : null
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    height: NAV_BAR_HEIGHT,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.greyBorder
  },
  midMenu: {
    alignItems: 'center'
  },
  leftMenu: {
    paddingLeft: 20,
    alignItems: 'flex-start'
  },
  rightMenu: {
    paddingRight: 20,
    alignItems: 'flex-end'
  },
  navText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgb(209, 87, 92)'
  }
});
