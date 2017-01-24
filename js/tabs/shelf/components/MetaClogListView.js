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
      <TouchableOpacity onPress={this.props.onPress ? this.props.onPress.bind(null, this.props.id) : null} style={{flex: 1, paddingHorizontal: 5, paddingVertical: 10, width: 100}}>
          <View style={{height: 90}}>
            <CircleImageWithCategory
              source={mapSource(this.props.preview)}
              category={this.props.category}
              size={85}
              shadowRadius={5}
              shadowColor={colors.fadedWhite}
            />
          </View>
          <View style={{height: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: colors.textWhite}} numberOfLines={1}>{this.props.title}</Text>
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
        <View style={{height: 20, flexDirection: 'row'}}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.header}</Text>
          <View style={{flex: 1}} />
          <View style={{alignItems: 'flex-end', justifyContent: 'center', paddingRight: 10}}>
            {
              this.props.renderButton ? this.props.renderButton() : null
            }
          </View>
        </View>
        <View style={{height: 130}}>
          <HorizontalListView
            showsHorizontalScrollIndicator={false}
            data={this.props.clogs}
            renderRow={(props) => {
              return <ClogMeta {...props} onPress={this.clogPress.bind(this)}/>;
            }}
          />
        </View>
      </View>
    );
  }

  clogPress(id) {
    this.props.navigator && this.props.navigator.push({page: 'book', id});
  }
}
