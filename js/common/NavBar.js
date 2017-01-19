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
            this.props.renderLeftMenu ? this.props.renderLeftMenu() : (this.props.backButton ? this.renderBackButton() : null)
          }
        </View>
        <View style={[styles.titleMenu, this.props.titleStyle]}>
        {
          this.props.renderTitle ? this.props.renderTitle() : this.renderTitle()
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

  renderBackButton() {
    return (
      <TouchableOpacity onPress={this.props.onBackPress}><Image style={{height: 20, resizeMode: 'contain'}} source={require('./img/backButton.png')}/></TouchableOpacity>
    );
  }

  renderTitle() {
    return (
      <Text style={[styles.navText, this.props.titleTextStyle]}>{this.props.title}</Text>
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
    flex: 4,
    alignItems: 'center'
  },
  leftMenu: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'flex-start'
  },
  rightMenu: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'flex-end'
  },
  navText: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});
