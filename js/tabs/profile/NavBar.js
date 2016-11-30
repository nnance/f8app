'use strict';

import React from 'react';
import {
  Text,
  Platform,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const NAV_BAR_HEIGHT = 40;

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
        <View style={styles.rightMenu}>
          { true ? null :
            <Text style={styles.navText}>{'>'}</Text>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    height: NAV_BAR_HEIGHT,
    backgroundColor: 'transparent',
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
  },
  navText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgb(209, 87, 92)'
  }
});
