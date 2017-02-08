

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import { styles as commonStyles, NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT } from './styles';

export const HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  container: {
    paddingTop: STATUS_BAR_HEIGHT,
    height: NAV_BAR_HEIGHT,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleMenu: {
    flex: 4,
    alignItems: 'center',
  },
  leftMenu: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
  rightMenu: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  navText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default class NavBar extends React.Component {
  renderTitle() {
    return (
      <Text style={[styles.navText, this.props.titleTextStyle]}>{this.props.title}</Text>
    );
  }

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
}

export class NavBarWithButton extends React.Component {
  constructor(...args) {
    super(...args);
    this.renderBackButton = this.renderBackButton.bind(this);
  }

  renderBackButton() {
    return (
      <TouchableOpacity onPress={this.props.onBackPress}><Image style={commonStyles.navBarIcon} source={require('./img/icon/backButton.png')} /></TouchableOpacity>
    );
  }

  render() {
    return (<NavBar
      renderLeftMenu={this.renderBackButton}
      {...this.props}
    />);
  }
}

export class NavBarWithPinkButton extends React.Component {
  constructor(...args) {
    super(...args);
    this.renderBackButton = this.renderBackButton.bind(this);
  }

  renderBackButton() {
    return (
      <TouchableOpacity onPress={this.props.onBackPress}><Image style={commonStyles.navBarIcon} source={require('./img/icon/backButton-pink.png')} /></TouchableOpacity>
    );
  }

  render() {
    return (<NavBar
      renderLeftMenu={this.renderBackButton}
      {...this.props}
    />);
  }
}
