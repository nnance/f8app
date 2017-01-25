import React from 'react';
import {
  View,
  Text,
  WebView
} from 'react-native';

import WKWebView from 'react-native-wkwebview-reborn';
import NavBar, {NavBarWithPinkButton} from '../../common/NavBar';

class Player extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NavBarWithPinkButton/>
        <WKWebView style={{flex: 1}} source={{uri: 'https://github.com/facebook/react-native'}} onMessage={(e) => console.log('^^', e)} />
      </View>
    );
  }
}

export default Player;
