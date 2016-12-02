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

const MyClogRow = (props) => (<TouchableOpacity style={styles.rowContainer}>
  <CircleImageWithCategory
    source={{
      uri: props.cover
    }}
    categorySource={{
      uri: props.categoryCover
    }}
    size={100}
  />
  <View style={{flex: 1, paddingLeft: 20}}>
    <Text style={{alignSelf: 'flex-end', fontSize: 12, color: commonColors.textFadedGrey}}>October 9</Text>
    <Text style={{fontWeight: 'bold', marginTop: 7}}>{props.title}</Text>
    <Text style={{fontSize: 12, marginTop: 5, color: commonColors.textGrey}}>{props.authors}</Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image source={{uri: "http://www.fujisan.ne.jp/fit/th/images/ohishikouen430.jpg"}} style={{width: 20, height: 20, borderRadius: 4}}/>
      <Text style={{paddingLeft: 5, fontSize: 12, color: commonColors.textFadedGrey}}>ดู {toHumanNumber(props.views)} ครั้ง</Text>
      <Image source={{uri: "http://www.fujisan.ne.jp/fit/th/images/ohishikouen430.jpg"}} style={{width: 20, height: 20, borderRadius: 4, marginLeft: 20}}/>
      <Text style={{paddingLeft: 5, fontSize: 12, color: commonColors.textFadedGrey}}>{toHumanNumber(props.likes)} Like</Text>
    </View>
  </View>
</TouchableOpacity>);

class MyClogScreen extends React.Component {
  render() {
    return (<View style={commonStyles.listViewContainer}>
      <NavBar title="Clog ของฉัน" onLeftPress={() => this.props.onBackPress && this.props.onBackPress()}/>
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
  }
});

export default MyClogScreen;
