import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import _ from 'lodash';

import FixBugScrollView from '../../../common/FixBugScrollView';
import CircleImageWithCategory from '../../../common/CircleImageWithCategory';
import CircleImage from '../../../common/CircleImage';
import { toHumanNumber, mapSource } from '../../../common/utils';
import { colors } from '../../../common/styles';

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

  renderBookmark(bookmark, idx) {
    return (
      <View key={idx} style={styles.bookmarkContainer}>
        <View>
          <CircleImage
            source={mapSource(bookmark.episode.thumbnailImage)}
            size={bookmarkThumbnailSize}
          />
          <View style={styles.bookmarkDetailContainer}>
            <Text style={styles.bookmarkText}>Bookmark {bookmark.episode.no}</Text>
          </View>
        </View>
      </View>
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
  render() {
    const props = {};
    props.clog = mockClog;
    return (<View style={{flex: 1}}>
      <NavBar
        title="Bookmark"
        onBackPress={this.props.onBackPress}
      />
      <Header clog={props.clog}/>
      <FixBugScrollView style={styles.bookmarkListContainer}>
        <BookmarkList
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
        episode {
          no
          thumbnailImage
        }
      }
    }
  `,
};

export default ClogBookmark;
