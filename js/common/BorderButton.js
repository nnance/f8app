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
    if (this.props.type === 'lightGreen') {
      textStyle = styles.lightGreenText;
      containerStyle = styles.lightGreenButton;
    }
    if (this.props.type === 'borderFadedBlack') {
      textStyle = styles.whiteText;
      containerStyle = styles.borderFadedBlack;
    }
    return (
      <View>
        <TouchableOpacity onPress={this.props.onPress} style={[styles.commonButton, containerStyle, this.props.containerStyle]}>
          <Text style={[styles.textContainer, textStyle, this.props.textStyle]}>{this.props.caption}</Text>
        </TouchableOpacity>
      </View>
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
  lightGreenText: {
    color: 'rgb(141, 227, 188)'
  },
  commonButton: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'transparent'
  },
  whiteButton: {
    backgroundColor: 'white'
  },
  lightGreenButton: {
    borderWidth: 1,
    borderColor: 'rgb(141, 227, 188)'
  },
  fadedWhiteButton: {
    borderWidth: 1,
    borderColor: 'white'
  },
  greyButton: {
    backgroundColor: colors.fadedGreyBackground
  },
  borderFadedBlack: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }
});

export default BorderButton;
