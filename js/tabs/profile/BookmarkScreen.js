import React from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
  ListView,
  TouchableOpacity
} from 'react-native';

import PureListView from '../../common/PureListView';
import CircleImage from '../../common/CircleImage';
import {toHumanNumber, random, mapSource} from '../../common/utils';

import CircleImageWithCategory from './CircleImageWithCategory';
import NavBar from './NavBar';
import {styles as commonStyles, colors} from './common';

const rightArrow = require('./img/icons/rightGreyArrow.png');

const BookmarkRow = props => (<TouchableOpacity style={styles.rowContainer}>
  <CircleImageWithCategory
    source={mapSource(props.cover)}
    categorySource={mapSource(props.categoryCover)}
    size={100}
  />
  <View style={{flex: 1, paddingLeft: 10}}>
    <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>{props.title}</Text>
    </View>
    <View style={{paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.textGrey}}>
        {props.bookmarkCount || 0} Bookmarks
      </Text>
    </View>
  </View>
  <TouchableOpacity style={{alignItems: 'flex-end'}}>
    <Image
      style={{
        height: 25,
        resizeMode: 'contain'
      }}
      source={rightArrow}
      />
  </TouchableOpacity>
</TouchableOpacity>);

class BookmarkScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      onDelete: false,
      deleteIndexs: []
    };
  }

  render() {
    return (<View style={commonStyles.listViewContainer}>
        <NavBar title="Bookmark"
          onLeftPress={() => this.props.onBackPress && this.props.onBackPress()}
          />
        <PureListView
          data={this.props.bookmark.map(
              (bookmark, i) => ({
                ...bookmark,
                willDelete: this.state.deleteIndexs.indexOf(i) !== -1,
                index: i
              })
            )}
          renderRow={
            (bookmark) => {
              return <BookmarkRow {...bookmark}/>;
            }
          }
        />
      </View>);
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center'
  },
  eachBookmarkContainer: {
    alignItems: 'center',
    paddingRight: 5
  }
});

export default BookmarkScreen;
