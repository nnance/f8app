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
import {toHumanNumber} from '../../common/utils';

import ButtomMenu from './ButtomMenu';

class Player extends React.Component {
  render() {
    if (this.props.loading) {
      return null;
    }
    return (
      <View style={{flex: 1}}>
        <NavBarWithPinkButton
          onBackPress={this.props.onBackPress}
          renderRightMenu={this.renderNavBarButton.bind(this)}
          renderTitle={this.renderTitle.bind(this)}
          titleStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
          leftMenuStyle={{
            flex: 0,
            paddingRight: 10
          }}
          />
        <WKWebView style={{flex: 1}} source={{uri: 'http://zapkub.github.io/clog/clog.html'}}/>
        <ButtomMenu likeCount={this.props.episode.likeCount} commentCount={this.props.episode.commentCount}/>
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
        EP.{this.props.episode.no} {this.props.episode.title}
      </Text>
      <Text style={styles.viewCountText}>
        อ่านแล้ว {toHumanNumber(this.props.episode.viewCount)} คน
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
