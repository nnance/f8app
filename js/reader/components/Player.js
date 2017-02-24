import React from 'react';
import {
  Image,
  View,
  Text,
  WebView,
  TouchableOpacity,
  StyleSheet,
  Share,
  Platform,
} from 'react-native';

import gql from 'graphql-tag';
import WKWebView from 'react-native-wkwebview-reborn';
import { NavBarWithPinkButton } from '../../common/NavBar';
import { colors } from '../../common/styles';
import { toHumanNumber } from '../../common/utils';
import ModalSpinner from '../../common/ModalSpinner';
import BookAndPlayerTabBar from '../../common/BookAndPlayerTabBar';
import { serverURL } from '../../env';

const styles = StyleSheet.create({
  navButton: {
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 14,
    color: colors.textPink,
  },
  viewCountText: {
    fontSize: 10,
    color: colors.textFadedPink,
  },
  textContainer: {
    marginRight: 50,
  },
});

class Player extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      loading: true,
    };

    this.onSharePress = this.onSharePress.bind(this);
    this.renderNavBarButton = this.renderNavBarButton.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  onSharePress() {
    Share.share({
      title: `EP.${this.props.episode.no} ${this.props.episode.title}`,
      message: 'http://139.59.253.62/mock-deep-link/player.html',
    });
  }

  renderNavBarButton() {
    /* eslint class-methods-use-this: warn */
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity>
          <Image style={styles.navButton} source={require('../img/bookmark-button.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.navButton} source={require('../img/follow-button.png')} />
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

  render() {
    if (this.props.loading) {
      return null;
    }
    let playerView;
    if (Platform.OS === 'android') {
      playerView = <WebView style={{ flex: 1 }} source={{ uri: `${serverURL}/static/demo-episode/clog.html` }} onLoadEnd={() => this.setState({ loading: false })} />;
    } else {
      playerView = <WKWebView style={{ flex: 1 }} source={{ uri: `${serverURL}/static/demo-episode/clog.html` }} onLoadEnd={() => this.setState({ loading: false })} />;
    }
    return (
      <View style={{ flex: 1 }}>
        <NavBarWithPinkButton
          onBackPress={this.props.onBackPress}
          renderRightMenu={this.renderNavBarButton}
          renderTitle={this.renderTitle}
          titleStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
          leftMenuStyle={{
            flex: 0,
            paddingRight: 10,
          }}
        />
        <View style={{ flex: 1 }}>
          <ModalSpinner visible={this.state.loading} />
          {playerView}
        </View>
        <BookAndPlayerTabBar
          onSharePress={this.onSharePress}
          likeCount={this.props.episode.likeCount}
          commentCount={this.props.episode.commentCount}
        />
      </View>
    );
  }
}

Player.fragments = {
  episode: gql`
    fragment Player on Episode {
      id
      no
      title
      likeCount
      commentCount
      viewCount
    }
  `,
};

export default Player;
