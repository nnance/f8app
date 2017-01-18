'use strict';

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

export const HEIGHT = 60;

export default class NavBar extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={[styles.leftMenu, this.props.leftMenuStyle]}>
          {
            this.props.renderLeftMenu ? this.props.renderLeftMenu() : null
          }
        </View>
        <View style={[styles.titleMenu, this.props.titleStyle]}>
        {
          this.props.renderTitle ? this.props.renderTitle() : null
        }
        </View>
        <View style={[styles.rightMenu, this.props.rightMenuStyle]}>
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
    height: HEIGHT,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleMenu: {
    alignItems: 'center'
  },
  leftMenu: {
    paddingLeft: 10,
    alignItems: 'flex-start'
  },
  rightMenu: {
    paddingRight: 10,
    alignItems: 'flex-end'
  }
});
