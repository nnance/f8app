import React from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';

import PureListView from '../../../common/PureListView';
import {toHumanNumber, mapSource} from '../../../common/utils';

import CircleImageWithCategory from '../../../common/CircleImageWithCategory';
import NavBar from './NavBar';
import {styles as commonStyles, colors as commonColors} from '../common';

const MyClogRow = (props) => (<TouchableOpacity style={styles.rowContainer}>
  <CircleImageWithCategory
    source={mapSource(props.cover)}
    categorySource={mapSource(props.categoryCover)}
    size={100}
  />
  <View style={{flex: 1, paddingLeft: 20}}>
    <Text style={{alignSelf: 'flex-end', fontSize: 12, color: commonColors.textFadedGrey}}>{moment(props.date).format('MMMM D')}</Text>
    <Text style={{fontWeight: 'bold', marginTop: 7}}>{props.title}</Text>
    <Text style={{fontSize: 12, marginTop: 5, color: commonColors.textGrey}}>{props.authors}</Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.detailSeparate}>
        <Image source={require('../img/icons/read.png')} style={{width: 20, height: 20, resizeMode: 'contain', borderRadius: 4}}/>
        <Text style={{paddingLeft: 5, fontSize: 12, color: commonColors.textFadedGrey}}>ดู {toHumanNumber(props.views)} ครั้ง</Text>
      </View>
      <View style={styles.detailSeparate}>
        <Image source={require('../img/icons/heart.png')} style={{width: 20, height: 20, resizeMode: 'contain', borderRadius: 4, marginLeft: 20}}/>
        <Text style={{paddingLeft: 5, fontSize: 12, color: commonColors.textFadedGrey}}>{toHumanNumber(props.likes)} Like</Text>
      </View>
    </View>
  </View>
</TouchableOpacity>);

class MyClogScreen extends React.Component {
  render() {
    return (<View style={commonStyles.listViewContainer}>
      <NavBar title="Clog ของฉัน" onLeftPress={this.props.onBackPress}/>
      <PureListView
        data={this.props.myClogs}
        renderRow={(clog) => {
          return <MyClogRow {...clog}/>;
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
  detailSeparate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default MyClogScreen;
