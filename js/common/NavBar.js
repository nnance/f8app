'use strict';

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

const NAV_BAR_HEIGHT = 60;

export default class NavBar extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={styles.leftMenu}>
          {
            this.props.renderLeftMenu ? this.props.renderLeftMenu() : null
          }
        </View>
        <View style={styles.midMenu}>
        {
          this.props.renderTitle ? this.props.renderTitle() : null
        }
        </View>
        <View style={styles.rightMenu}>
          {
            this.props.renderRightMenu ? this.props.renderRightMenu() : null
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    height: NAV_BAR_HEIGHT,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
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
  }
});
