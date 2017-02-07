

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { NavBarWithPinkButton } from '../../../common/NavBar';

import { colors } from '../../../common/styles';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: colors.greyBorder,
  },
  backButton: {
    height: 20,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPink,
  },
});

export default class NavBar extends React.Component {
  constructor(...args) {
    super(...args);
    this.renderRightMenu = this.renderRightMenu.bind(this);
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

  render() {
    return (
      <NavBarWithPinkButton
        {...this.props}
        containerStyle={styles.container}
        renderRightMenu={this.renderRightMenu}
        title={this.props.title}
        titleTextStyle={styles.titleText}
      />
    );
  }
}
