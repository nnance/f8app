'use strict';

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import CustomNavBar from '../../../common/NavBar';

import {colors} from '../../../common/styles';

export default class NavBar extends React.Component {
  render() {
    return (
      <CustomNavBar
        containerStyle={styles.container}
        renderLeftMenu={this.renderLeftMenu.bind(this)}
        renderRightMenu={this.renderRightMenu.bind(this)}
        title={this.props.title}
        titleTextStyle={styles.titleText}
        />
    );
  }

  renderLeftMenu() {
    return (
      <TouchableOpacity style={styles.leftMenu} onPress={this.props.onLeftPress}>
        <Image style={styles.backButton} source={require('../img/icons/backButton.png')}/>
      </TouchableOpacity>
    );
  }

  renderRightMenu() {
    return (
      <TouchableOpacity style={styles.rightMenu} onPress={this.props.onRightPress}>
        {
          this.props.renderRightMenu ? this.props.renderRightMenu() : null
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: colors.greyBorder
  },
  backButton: {
    height: 20,
    resizeMode: 'contain'
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgb(249, 65, 92)'
  }
});
