import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Share,
  PanResponder,
  ActivityIndicator,
  Dimensions,
  Animated,
} from 'react-native';

import gql from 'graphql-tag';
import * as Progress from 'react-native-progress';

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

const screenWidth = Dimensions.get('window').width;

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

const MAX_HEIGHT_INDICATOR = 50;
const toMaxHeightIndicatorDuration = 200;
const hideIndicatorDuration = 300;

class Player extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      loading: true,
      dyPanResponder: 0,
      endedScrollView: false,
      nextEpisodeRatioAnimated: new Animated.Value(0.0),
      nextEpisodeRatioAnimatedValue: 0.0,
    };

    this.state.nextEpisodeRatioAnimated.addListener(({value}) => this.setState({
      nextEpisodeRatioAnimatedValue: value,
    }));

    this.onSharePress = this.onSharePress.bind(this);
    this.onCommentPress = this.onCommentPress.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBookmarkPress = this.onBookmarkPress.bind(this);
    this.onNextEpisode = this.onNextEpisode.bind(this);
    this.onRemoveBookmarkPress = this.onRemoveBookmarkPress.bind(this);
    this.renderNavBarButton = this.renderNavBarButton.bind(this);
    this.renderTitle = this.renderTitle.bind(this);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.state.endedScrollView && this.props.episode.nextEpisode,
      onStartShouldSetPanResponderCapture: () => this.state.endedScrollView && this.props.episode.nextEpisode,
      onMoveShouldSetPanResponder: () => this.state.endedScrollView && this.props.episode.nextEpisode,
      onMoveShouldSetPanResponderCapture: () => this.state.endedScrollView && this.props.episode.nextEpisode,
      onPanResponderMove: (evt, gestureState) => {
        this.setState({
          dyPanResponder: gestureState.dy,
        });

        this.state.nextEpisodeRatioAnimated.setValue(this.nextEpisodeRatio());
      },
      onPanResponderRelease: () => {
        if (this.nextEpisodeRatio() >= 1) {
          this.onNextEpisode();
          Animated.timing(this.state.nextEpisodeRatioAnimated, {
            toValue: 1,
            duration: toMaxHeightIndicatorDuration,
          }).start();
        }
        else {
          Animated.timing(this.state.nextEpisodeRatioAnimated, {
            toValue: 0,
            duration: hideIndicatorDuration,
          }).start();
          this.setState({
            dyPanResponder: 0,
          });
        }
      },
    });
  }
  

  componentWillReceiveProps(nextProps) {
    if (this.props.loading === true && nextProps.loading === false) {
      this.onProgress(0);
      this.state.nextEpisodeRatioAnimated.setValue(0);
      this.setState({
        dyPanResponder: 0,
      });
    }
  }

  componentDidMount() {
    // MOCK PROGESS
    // this.onProgress(0);
  }

  onBookmarkPress() {
    this.props.addEpisodeBookmark(this.props.episode);
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

  onNextEpisode() {
    setTimeout(() => {
      this.props.refetch({
        id: this.props.episode.nextEpisode.id,
      });
    }, toMaxHeightIndicatorDuration + 100)
  }

  onProgress(ratio) {
    if (ratio >= 1 && !this.state.endedScrollView) {
      this.setState({
        endedScrollView: true,
      });
    }
    if (ratio < 1 && this.state.endedScrollView) {
      this.setState({
        endedScrollView: false,
      });
    }
  }

  onCommentPress() {
    this.props.goToComment(this.props.episode.id);
  }

  nextEpisodeRatio() {
    const diffDy = -this.state.dyPanResponder / 3;
    let ratio = diffDy / MAX_HEIGHT_INDICATOR;
    if (ratio < 0) {
      ratio = 0;
    }
    return ratio;
  }

  renderNavBarButton() {
    /* eslint class-methods-use-this: warn */
    return (
      <View style={{ flexDirection: 'row' }}>
        {
          !this.props.episodeBookmark ?
            <TouchableOpacity onPress={this.onBookmarkPress}>
              <Image style={styles.navButton} source={require('../../assets/reader/bookmark-button.png')} />
            </TouchableOpacity> :
            <TouchableOpacity onPress={this.onRemoveBookmarkPress}>
              <Image style={styles.navButton} source={require('../../assets/reader/bookmarked-button.png')} />
            </TouchableOpacity>
        }
        <TouchableOpacity>
          <Image style={styles.navButton} source={require('../../assets/reader/follow-button.png')} />
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

    // source={{ uri: `${serverURL}/clog/${this.props.episode.id}` }}

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          hidden={false}
        />
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
        <View style={{ flex: 1 }} {...this._panResponder.panHandlers}>
          <ModalSpinner visible={this.state.loading} />
          <View style={{flex: 1, backgroundColor: 'white'}}>
              <ClogPlayer
                source={{ uri: `${serverURL}/clog/${this.props.episode.id}` }}
                style={{ flex: 1 }}
                onMessage={() => console.log('')}
                onLoad={() => this.setState({ loading: false })}
                onProgress={this.onProgress}
            />
          </View>
          {
           this.state.nextEpisodeRatioAnimatedValue > 0 ?
              <Animated.View
                style={{
                  position: 'absolute',
                  bottom: 5,
                  opacity: this.state.nextEpisodeRatioAnimated.interpolate({
                    inputRange: [0, 0.3, 1],
                    outputRange: [0, 1, 1],
                  }),
                  left: (screenWidth / 2) - 15,
                  transform: [
                    { translateY: Animated.multiply(this.state.nextEpisodeRatioAnimated, -MAX_HEIGHT_INDICATOR) },
                  ]
                }}
              >
                <Progress.Pie progress={this.nextEpisodeRatio() > 1 ? 1 : this.nextEpisodeRatio()} size={30} />
              </Animated.View>
               : null
          }
        </View>
        <BookAndPlayerTabBar
          onSharePress={this.onSharePress}
          onCommentPress={this.onCommentPress}
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
      viewCount
      nextEpisode {
        id
      }
      ...AddedBookmarkEpisode
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
