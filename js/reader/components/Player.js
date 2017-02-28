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

// Import ClogPlayer component from submodule
// if any error occur please check if submodule is outdated
// note: please run `yarn install` inside player
// note2: react-native-fs require manual link `react-native link react-native-fs`
import ClogPlayer from '../../player/components/ClogPlayer';


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
    this.onBookmarkPress = this.onBookmarkPress.bind(this);
    this.onRemoveBookmarkPress = this.onRemoveBookmarkPress.bind(this);
    this.renderNavBarButton = this.renderNavBarButton.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  onBookmarkPress() {
    this.props.addEpisodeBookmark(this.props.episode.id);
  }

  onRemoveBookmarkPress() {
    this.props.removeBookmarks([this.props.episodeBookmark.id]);
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
        {
          !this.props.episodeBookmark ?
          <TouchableOpacity onPress={this.onBookmarkPress}>
            <Image style={styles.navButton} source={require('../img/bookmark-button.png')} />
          </TouchableOpacity> :
          <TouchableOpacity onPress={this.onRemoveBookmarkPress}>
            <Image style={styles.navButton} source={require('../img/bookmarked-button.png')} />
          </TouchableOpacity>
        }
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
          <ClogPlayer
            source={{ uri: `${serverURL}/clog/${this.props.episode.id}` }}
            style={{ flex: 1 }}
            onMessage={() => console.log('')}
            onLoad={() => this.setState({ loading: false })}
          />
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
    fragment PlayerEpisode on Episode {
      id
      clogId
      no
      title
      likeCount
      commentCount
      viewCount
    }
  `,
  bookmark: gql`
    fragment PlayerBookmark on Bookmark {
      id
      clogId
      episodeId
    }
  `,
};

export default Player;
