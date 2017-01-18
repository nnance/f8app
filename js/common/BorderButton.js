import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

import {colors} from './styles';

class BorderButton extends React.Component {
  render() {
    let textStyle, containerStyle;
    textStyle = styles.blackText;
    containerStyle = styles.whiteButton;
    if (this.props.type === 'fadedWhite') {
      textStyle = styles.whiteText;
      containerStyle = styles.fadedWhiteButton;
    }
    if (this.props.type === 'fadedGrey') {
      textStyle = styles.whiteFadedText;
      containerStyle = styles.greyButton;
    }
    return (
      <TouchableOpacity onPress={this.props.onPress} style={[styles.commonButton, containerStyle, this.props.containerStyle]}>
        <Text style={[styles.textContainer, textStyle, this.props.textStyle]}>{this.props.caption}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    fontSize: 12
  },
  whiteText: {
    color: 'white'
  },
  blackText: {
    color: 'black'
  },
  whiteFadedText: {
    color: colors.textFadedWhite
  },
  commonButton: {
    height: 22,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'transparent'
  },
  whiteButton: {
    backgroundColor: 'white'
  },
  fadedWhiteButton: {
    borderWidth: 1,
    borderColor: 'white'
  },
  greyButton: {
    backgroundColor: colors.fadedGreyBackground
  }
});

export default BorderButton;
