import React from 'react';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView
} from 'react-native';

import PureListView from '../../../common/PureListView';
import {colors} from '../../../common/styles';
import CircleImageWithCategory from '../../../common/CircleImageWithCategory';
import {mapSource} from '../../../common/utils';

class ClogMeta extends React.Component {
  render() {
    return (
      <View style={{flex: 1, paddingHorizontal: 5, paddingVertical: 10, width: 100}}>
          <View style={{flex: 7}}>
            <CircleImageWithCategory
              source={mapSource(require('../img/B.png'))}
              categorySource={mapSource(require('../img/D.png'))}
              size={85}
              imageStyle={{
                borderWidth: 3,
                borderColor: colors.pinkBorder
              }}
            />
          </View>
          <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
            <Text style={{fontSize: 12, color: colors.textWhite}} numberOfLines={1}>{this.props.title}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 10, color: colors.textFadedWhite}} numberOfLines={1}>{this.props.author}</Text>
          </View>
      </View>
    );
  }
}

export default class ClogListView extends React.Component {
  constructor(...args) {
    super(...args);
    let dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.clogs)
    };
  }

  render() {
    return (
      <View style={{flex: 1, padding: 10}}>
        <View style={{flex: 0.3}}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.header}</Text>
        </View>
        <View style={{flex: 3}}>
          <ListView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            dataSource={this.state.dataSource}
            renderRow={(props) => {
              return <ClogMeta title="Mr.Smith Goes to somewhere" author="David Beckham"/>;
            }}
          />
        </View>
      </View>
    );
  }
}
