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
import {getCategoryIcon} from '../../../models/clog';

class ClogMeta extends React.Component {
  render() {
    return (
      <TouchableOpacity style={{flex: 1, paddingHorizontal: 5, paddingVertical: 10, width: 100}}>
          <View style={{flex: 7}}>
            <CircleImageWithCategory
              source={mapSource(this.props.cover)}
              categorySource={getCategoryIcon(this.props.category)}
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
      </TouchableOpacity>
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

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.clogs !== nextProps.clogs) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.clogs)
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.3, flexDirection: 'row'}}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.header}</Text>
          <View style={{flex: 1}}/>
          <View style={{alignItems: 'flex-end', justifyContent: 'center', paddingRight: 10}}>
            {
              this.props.renderButton ? this.props.renderButton() : null
            }
          </View>
        </View>
        <View style={{flex: 3}}>
          <ListView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            dataSource={this.state.dataSource}
            renderRow={(props) => {
              return <ClogMeta {...props}/>;
            }}
          />
        </View>
      </View>
    );
  }
}
