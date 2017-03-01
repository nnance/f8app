import React from 'react';
import gql from 'graphql-tag';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Swipeout from 'react-native-swipe-out';

import FixBugPureListView from '../../../common/FixBugPureListView';
import { bindFn, mapSource } from '../../../common/utils';

import CircleImageWithCategory from '../../../common/CircleImageWithCategory';
import NavBar from './NavBar';
import { styles as commonStyles } from '../common';
import { colors } from '../../../common/styles';

const ScreenWidth = require('Dimensions').get('window').width;

const styles = StyleSheet.create({
  rowContainer: {
    width: ScreenWidth + 1,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eachBookmarkContainer: {
    alignItems: 'center',
    paddingRight: 5,
  },
});

const BookmarkRow = props => (
  <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
    <Swipeout
      style={{ flex: 1, backgroundColor: 'transparent' }}
      right={[{
        text: 'DELETE',
        onPress: props.onDeleteBookmarkPress,
      }]}
      autoClose
    >
      <TouchableOpacity onPress={props.onPress} style={styles.rowContainer}>
        <CircleImageWithCategory
          source={mapSource(props.clog.thumbnailImage)}
          category={props.clog.category}
          size={100}
        />
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{props.clog.title}</Text>
          </View>
          {
            props.episode ?
              <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.textGrey }} numberOfLines={2}>
                Ep.{props.episode.no} {props.episode.title || 0}asdasdasdasdasdasdasdasdasdasd
              </Text>
              </View>
            : null
          }
        </View>
      </TouchableOpacity>
    </Swipeout>
  </ScrollView>
);

class BookmarkScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      onDelete: false,
      deleteIndexs: [],
    };

    this.onDeleteBookmarkPress = this.onDeleteBookmarkPress.bind(this);
  }

  onDeleteBookmarkPress(id) {
    this.props.removeBookmarks([id]);
  }

  render() {
    return (<View style={commonStyles.listViewContainer}>
      <NavBar
        title="Bookmark"
        onBackPress={this.props.onBackPress}
      />
      <FixBugPureListView
        data={this.props.bookmarks}
        renderRow={
            bookmark => <BookmarkRow
              {...bookmark}
              onDeleteBookmarkPress={bindFn(this.onDeleteBookmarkPress, bookmark.id)}
              onPress={bindFn(this.props.redirectTo, bookmark.url)}
              setCanScroll={this.props.setTabViewScrollable}
            />
          }
      />
    </View>);
  }
}

BookmarkScreen.fragments = {
  bookmark: gql`
    fragment BookmarkScreen on Bookmark {
      id
      url
      clog {
        id
        title
        category
        thumbnailImage
      }
      episode {
        id
        no
        title
        thumbnailImage
      }
    }
  `,
};

export default BookmarkScreen;
