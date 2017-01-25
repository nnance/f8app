import React from 'react';
import {
  Image,
  View,
  Text,
  WebView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import WKWebView from 'react-native-wkwebview-reborn';
import NavBar, {NavBarWithPinkButton} from '../../common/NavBar';
import {colors} from '../../common/styles';

class Player extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NavBarWithPinkButton
          renderRightMenu={this.renderNavBarButton.bind(this)}
          renderTitle={this.renderTitle.bind(this)}
          titleStyle={{
            justifyContent: 'center'
          }}
          leftMenuStyle={{
            flex: 0,
            paddingRight: 10
          }}
          />
        <WKWebView style={{flex: 1}} source={{uri: 'http://zapkub.github.io/clog/clog.html'}} onMessage={(e) => console.log('^^', e)} />
      </View>
    );
  }

  renderNavBarButton() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Image style={styles.navButton} source={require('../img/bookmark-button.png')}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.navButton} source={require('../img/follow-button.png')}/>
        </TouchableOpacity>
      </View>
    );
  }

  renderTitle() {
    return (<View style={styles.textContainer}>
      <Text numberOfLines={1} style={styles.titleText}>
        EP. 2/8 THE MARTIN BRABRABRABRABRABRABRABRABRABRAB
      </Text>
      <Text style={styles.viewCountText}>
        อ่านแล้ว 1,234 คน
      </Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  navButton: {
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: 'contain'
  },
  titleText: {
    fontSize: 14,
    color: colors.textPink
  },
  viewCountText: {
    fontSize: 10,
    color: colors.textFadedPink
  },
  textContainer: {
    marginRight: 50
  }
});

export default Player;
