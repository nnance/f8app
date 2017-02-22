import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import _ from 'lodash';

import FixBugScrollView from '../../../common/FixBugScrollView';
import CircleImageWithCategory from '../../../common/CircleImageWithCategory';
import CircleImageWithSubImage from '../../../common/CircleImageWithSubImage';
import CircleImage from '../../../common/CircleImage';
import { toHumanNumber, mapSource, bindFn } from '../../../common/utils';
import { styles as commonStyles, colors, NAV_BAR_ICON_HEIGHT } from '../../../common/styles';

import NavBar from './NavBar';

const limitPerRow = 3;
const height = 130;
const thumbnailPadding = 15;
const headerThumbnailSize = height - (thumbnailPadding * 2);
const bookmarkThumbnailSize = headerThumbnailSize - 15;

const styles = StyleSheet.create({
  headerContainer: {
    height: height,
    backgroundColor: colors.nearlyWhiteBackground,
    flexDirection: 'row',
  },
  headerThumbnailContainer: {
    padding: 15,
  },
  headerDetailContainer: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookmarkCountText: {
    fontSize: 15,
    color: colors.textFadedGrey,
  },
  bookmarkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarksRowContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookmarkListContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  bookmarkDetailContainer: {
    alignItems: 'center',
    paddingTop: 5,
  },
  bookmarkText: {
    fontSize: 15,
    color: colors.textFadedGrey,
  }
});

const Header = (props) => (<View style={styles.headerContainer}>
  <View style={styles.headerThumbnailContainer}>
    <CircleImageWithCategory
      size={headerThumbnailSize}
      source={mapSource(props.clog.thumbnailImage)}
      category={props.clog.category}
      shadowRadius={5}
      shadowColor="rgba(255, 255, 255, 0.5)"
    />
  </View>
  <View style={styles.headerDetailContainer}>
    <Text style={styles.titleText} numberOfLines={2}>{props.clog.title}</Text>
    <Text style={styles.bookmarkCountText} numberOfLines={1}>{toHumanNumber(props.clog.myBookmarks.length)} Bookmarks</Text>
  </View>
</View>);

class BookmarkList extends React.Component {
  constructor(...args) {
    super(...args);
  }

  renderBookmark(bookmark) {
    return (
      <TouchableOpacity onPress={bindFn(this.props.onBookmarkPress, bookmark.id)} key={bookmark.id} style={styles.bookmarkContainer}>
        <View>
          <CircleImageWithSubImage
            source={mapSource(bookmark.episode.thumbnailImage)}
            size={bookmarkThumbnailSize}
            shadowRadius={5}
            shadowColor="rgba(255, 255, 255, 0.5)"
            subSource={this.props.checkedBookmarkIds.indexOf(bookmark.id) !== -1 ? require('../img/icons/checked.png') : null}
          />
          <View style={styles.bookmarkDetailContainer}>
            <Text style={styles.bookmarkText}>Bookmark {bookmark.episode.no}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderBookmarksRow(bookmarks, idx) {
    return (
      <View key={idx} style={styles.bookmarksRowContainer}>
        {
          bookmarks.map((bookmark, idx) => this.renderBookmark(bookmark, idx))
        }
        <View style={{
          flex: limitPerRow - bookmarks.length,
        }}/>
      </View>
    );
  }

  render() {
    return (
      <View>
        {
          _.reduce(this.props.bookmarks, (acc, cur) => {
            let last = acc[acc.length - 1];
            if (!last || last.length >= limitPerRow) {
              last = [];
              acc.push(last);
            }
            last.push(cur);
            return acc;
          }, [])
          .map((row, idx) => this.renderBookmarksRow(row, idx))
        }
      </View>
    );
  }
}

let idx = 1;
function getMockBookmark() {
  const mockBookmark = {
    id: idx,
    episode: {
      no: idx,
      thumbnailImage: require('../img/A.png'),
    },
  };
  idx = idx + 1;
  return mockBookmark;
}

const mockClog = {
  title: 'Richer Richer manss',
  thumbnailImage: require('../img/B.png'),
  category: 'N',
  myBookmarks: [getMockBookmark(), getMockBookmark(), getMockBookmark(), getMockBookmark(), getMockBookmark(), getMockBookmark(), getMockBookmark(), getMockBookmark(), getMockBookmark(), getMockBookmark(), getMockBookmark(), getMockBookmark(), getMockBookmark()],
};

class ClogBookmark extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selecting: false,
      checkedBookmarkIds: [],
    };
    
    this.onWillCheckBookmark = this.onWillCheckBookmark.bind(this);
    this.onDeleteBookmark = this.onDeleteBookmark.bind(this);
    this.onBookmarkPress = this.onBookmarkPress.bind(this);
    this.renderOptionButton = this.renderOptionButton.bind(this);
  }

  onWillCheckBookmark() {
    this.setState({
      selecting: true,
      checkedBookmarkIds: [],
    });
  }

  onDeleteBookmark() {
    this.setState({
      selecting: false,
      checkedBookmarkIds: [],
    });
  }

  onBookmarkPress(id) {
    if (this.state.selecting) {
      if (this.state.checkedBookmarkIds.indexOf(id) === -1) {
        this.setState({
          checkedBookmarkIds: [...this.state.checkedBookmarkIds, id],
        });
      }
      else {
        this.setState({
          checkedBookmarkIds: _.pull(this.state.checkedBookmarkIds, id),
        });
      }
    }
  }

  renderOptionButton() {
    if (this.state.selecting) {
      return (
        <TouchableOpacity onPress={this.onDeleteBookmark}>
          <Image
            style={commonStyles.navBarIcon}
            source={require('../../../common/img/icon/trash.png')}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.onWillCheckBookmark}>
        <Image
          style={commonStyles.navBarIcon}
          source={require('../../../common/img/icon/check-list-menu.png')}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const props = {};
    props.clog = mockClog;
    return (<View style={{flex: 1}}>
      <NavBar
        title="Bookmark"
        onBackPress={this.props.onBackPress}
        renderRightMenu={this.renderOptionButton}
      />
      <Header clog={props.clog}/>
      <FixBugScrollView style={styles.bookmarkListContainer}>
        <BookmarkList
          onBookmarkPress={this.onBookmarkPress}
          checkedBookmarkIds={this.state.checkedBookmarkIds}
          bookmarks={props.clog.myBookmarks}
        />
      </FixBugScrollView>
    </View>);
  }
}

ClogBookmark.fragments = {
  clog: `
    fragment ClogBookmark on Clog {
      myBookmarks {
        id
        episode {
          no
          thumbnailImage
        }
      }
    }
  `,
};

export default ClogBookmark;
