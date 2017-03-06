import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 13,
    height: 20,
    resizeMode: 'stretch',
  },
  text: {
    color: '#F33B56',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

class CommentHeader extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <Image style={style.backButton} source={require('../img/back-button.png')} />
        <Text style={style.text}>Comment</Text>
      </View>
    );
  }
}

export default CommentHeader;
