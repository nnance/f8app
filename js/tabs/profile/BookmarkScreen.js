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
import {toHumanNumber, random} from '../../common/utils';

import CircleImageWithCategory from './CircleImageWithCategory';
import NavBar from './NavBar';
import {styles as commonStyles, colors as commonColors} from './common';

const BookmarkRow = props => (<TouchableOpacity style={styles.rowContainer}>
  <CircleImageWithCategory
    source={{
      uri: props.cover
    }}
    categorySource={{
      uri: props.categoryCover
    }}
    size={100}
  />
  <View style={{flex: 1, paddingLeft: 10}}>
    <Text style={{marginTop: 5, fontWeight: 'bold', fontSize: 16}}>{props.title}</Text>
    <View style={{paddingTop: 10, flexDirection: 'row'}}>
      {
        [1, 2, 3, 4].map(() => (
          <View style={styles.eachBookmarkContainer}>
            <CircleImage
              source={{
                uri: "http://www.fujisan.ne.jp/fit/th/images/ohishikouen430.jpg"
              }}
              size={50}
            />
            <Text style={{fontSize: 10}}>bookmark 1</Text>
          </View>
        ))
      }
    </View>
  </View>
</TouchableOpacity>);

class BookmarkScreen extends React.Component {
  render() {
    return (<View style={commonStyles.listViewContainer}>
        <NavBar title="Bookmark" onLeftPress={() => this.props.onBackPress && this.props.onBackPress()}/>
        <PureListView
          data={this.props.bookmark}
          renderRow={(bookmark) => {
            return <BookmarkRow {...bookmark}/>;
          }}
        />
      </View>);
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    padding: 13,
    flexDirection: 'row'
  },
  eachBookmarkContainer: {
    alignItems: 'center',
    paddingRight: 5
  }
});

export default BookmarkScreen;
