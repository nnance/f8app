import React from 'react';
import gql from 'graphql-tag';

import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import FixBugPureListView from '../../../common/FixBugPureListView';
import { bindFn, mapSource } from '../../../common/utils';

import CircleImageWithCategory from '../../../common/CircleImageWithCategory';
import NavBar from './NavBar';
import { styles as commonStyles } from '../common';
import { colors } from '../../../common/styles';

const styles = StyleSheet.create({
  rowContainer: {
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eachBookmarkContainer: {
    alignItems: 'center',
    paddingRight: 5,
  },
});

const BookmarkRow = props => (<TouchableOpacity onPress={props.onPress} style={styles.rowContainer}>
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
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.textGrey }} numberOfLines={3}>
          Ep.{props.episode.no} {props.episode.title || 0}
        </Text>
      </View>
      : null
    }
  </View>
</TouchableOpacity>);

class BookmarkScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      onDelete: false,
      deleteIndexs: [],
    };
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
            bookmark => <BookmarkRow {...bookmark} onPress={bindFn(this.props.redirectTo, bookmark.url)}/>
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
}

export default BookmarkScreen;
