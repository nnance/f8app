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
import {styles as commonStyles, colors} from './common';

const optionIcon = require('./img/icons/bookmark.png');
const deleteIcon = require('./img/icons/candy.png');

const CancelDelete = (props) => (<View style={{
  padding: 4,
  paddingLeft: 5,
  paddingRight: 5,
  borderRadius: 5,
  backgroundColor: 'rgba(190, 190, 190, 0.8)'
}}>
  <Text style={{
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
    width: 60
  }}>
    ยกเลิก
  </Text>
</View>);

const DeleteButton = (props) => (<View style={{
  padding: 4,
  paddingLeft: 5,
  paddingRight: 5,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: 'rgb(141, 227, 188)'
}}>
  <Text style={{
    textAlign: 'center',
    color: 'rgb(141, 227, 188)',
    fontSize: 13,
    width: 60
  }}>
    เลือก
  </Text>
</View>);

function mapSource(source) {
  if (typeof(source) === 'string') {
    return {
      uri: source
    };
  }
  return source;
}

const BookmarkRow = props => (<TouchableOpacity style={styles.rowContainer}>
  <CircleImageWithCategory
    source={mapSource(props.cover)}
    categorySource={mapSource(props.categoryCover)}
    size={100}
  />
  <View style={{flex: 1, paddingLeft: 10}}>
    <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>{props.title}</Text>
      {
        props.showDelete ?
        <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={() => props.onToggle && props.onToggle()}>
          {props.willDelete ? <CancelDelete/> : <DeleteButton/>}
        </TouchableOpacity> : props.onDelete
      }
    </View>
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
          <Text style={{fontSize: 10, color: colors.textGrey}}>bookmark 1</Text>
          </View>
        ))
      }
    </View>
  </View>
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
          onRightPress={() => this.onRightMenuPress()}
          renderRightMenu={() => {
            return (<View>
              <Image
                style={{
                  width: 20,
                  height: 20
                }}
                source={!this.state.onDelete ? optionIcon : deleteIcon}
                />
            </View>);
          }}
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
            this.state.onDelete ?
              (bookmark) => {
                return <BookmarkRow {...bookmark} showDelete={true} onToggle={() => {
                    if (this.state.deleteIndexs.indexOf(bookmark.index) === -1) {
                      this.setState({
                        deleteIndexs: [...this.state.deleteIndexs, bookmark.index]
                      });
                    }
                    else {
                      this.setState({
                        deleteIndexs: this.state.deleteIndexs.filter(i => i !== bookmark.index)
                      });
                    }
                  }}/>;
              } :
              (bookmark) => {
                return <BookmarkRow {...bookmark} showDelete={false}/>;
              }
          }
        />
      </View>);
  }

  onRightMenuPress() {
    if (this.state.onDelete) {
      this.setState({
        deleteIndexs: []
      });
    }
    else {

    }
    this.setState({
      onDelete: !this.state.onDelete
    });
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
