import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import moment from 'moment';

import {colors} from './styles';
import PureListView from './PureListView';
import FixBugScrollView from './FixBugScrollView';
import CircleImageWithCategory from './CircleImageWithCategory';
import {toHumanNumber, mapSource} from './utils';

const ClogRow = (props) => (<TouchableOpacity onPress={props.onPress ? props.onPress.bind(null, props.id) : null} style={styles.rowContainer}>
  <CircleImageWithCategory
    source={mapSource(props.preview)}
    category={props.category}
    size={100}
  />
  <View style={{flex: 1, paddingLeft: 20}}>
    <Text style={{alignSelf: 'flex-end', fontSize: 12, color: colors.textFadedGrey}}>{moment(props.createdAt).format('MMMM D')}</Text>
    <Text style={{fontWeight: 'bold', marginTop: 7}}>{props.title}</Text>
    <Text style={{fontSize: 12, marginTop: 5, color: colors.textGrey}}>{props.author.name}</Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.detailSeparate}>
        <Image source={require('./img/icon/read.png')} style={{width: 20, height: 20, resizeMode: 'contain', borderRadius: 4}}/>
        <Text style={{paddingLeft: 5, fontSize: 12, color: colors.textFadedGrey}}>ดู {toHumanNumber(props.viewCount)} ครั้ง</Text>
      </View>
      <View style={styles.detailSeparate}>
        <Image source={require('./img/icon/heart.png')} style={{width: 20, height: 20, resizeMode: 'contain', borderRadius: 4, marginLeft: 20}}/>
        <Text style={{paddingLeft: 5, fontSize: 12, color: colors.textFadedGrey}}>{toHumanNumber(props.likeCount)} Like</Text>
      </View>
    </View>
  </View>
</TouchableOpacity>);

class ClogListView extends React.Component {
  render() {
    return (
      <FixBugScrollView>
        <PureListView
          data={this.props.clogs}
          renderRow={(clog) => {
            return <ClogRow {...clog} onPress={this.onClogPress.bind(this)}/>;
          }}
        />
      </FixBugScrollView>
    );
  }

  onClogPress(id) {
    this.props.navigator && this.props.navigator.push({page: 'book', id});
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    padding: 13,
    flexDirection: 'row'
  },
  detailSeparate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ClogListView;
