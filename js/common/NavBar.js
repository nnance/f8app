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

import {styles as commonStyles} from './styles';

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

  renderTitle() {
    return (
      <Text style={[styles.navText, this.props.titleTextStyle]}>{this.props.title}</Text>
    );
  }
}

export class NavBarWithButton extends React.Component {
  render() {
    return <NavBar
      renderLeftMenu={this.renderBackButton.bind(this)}
      {...this.props}
      />;
  }

  renderBackButton() {
    return (
      <TouchableOpacity onPress={this.props.onBackPress}><Image style={commonStyles.navBarIcon} source={require('./img/icon/backButton.png')}/></TouchableOpacity>
    );
  }
}

export class NavBarWithPinkButton extends React.Component {
  render() {
    return <NavBar
      renderLeftMenu={this.renderBackButton.bind(this)}
      {...this.props}
      />;
  }

  renderBackButton() {
    return (
      <TouchableOpacity onPress={this.props.onBackPress}><Image style={commonStyles.navBarIcon} source={require('./img/icon/backButton-pink.png')}/></TouchableOpacity>
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
