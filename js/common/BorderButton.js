import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

class BorderButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={[styles.whiteButton, this.props.containerStyle]}>
        <Text style={[styles.textContainer, this.props.textStyle]}>{this.props.caption}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    fontSize: 13
  },
  whiteButton: {
    height: 18,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'white'
  }
});

export default BorderButton;
