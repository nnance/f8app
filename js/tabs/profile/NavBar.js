'use strict';

import React from 'react';
import {
  Text,
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import {colors} from './common';

const NAV_BAR_HEIGHT = 50;

export default class NavBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftMenu} onPress={() => this.props.onLeftPress && this.props.onLeftPress()}>
          <Image style={styles.backButton} source={require('./img/icons/backButton.png')}/>
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
  backButton: {
    height: 20,
    resizeMode: 'contain'
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
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgb(209, 87, 92)'
  }
});
