import React from 'react';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView
} from 'react-native';

import HorizontalListView from '../../../common/HorizontalListView';
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
              category={this.props.category}
              size={85}
              shadowRadius={5}
              shadowColor={colors.fadedWhite}
            />
          </View>
          <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
            <Text style={{fontSize: 12, color: colors.textWhite}} numberOfLines={1}>{this.props.title}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 10, color: colors.textFadedWhite}} numberOfLines={1}>{this.props.author.name}</Text>
          </View>
      </TouchableOpacity>
    );
  }
}

export default class MetaClogListView extends React.Component {
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
          <HorizontalListView
            showsHorizontalScrollIndicator={false}
            data={this.props.clogs}
            renderRow={(props) => {
              return <ClogMeta {...props}/>;
            }}
          />
        </View>
      </View>
    );
  }
}
