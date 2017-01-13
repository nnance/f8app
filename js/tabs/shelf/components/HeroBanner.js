import React from 'react';

import {
  View,
  Image,
  Text
} from 'react-native';

import CircleImage from '../../../common/CircleImage';
import PureListView from '../../../common/PureListView';
import {colors} from '../../../common/styles';

const Row = (props) => (<View style={{flex: 1, padding: 20}}>
  <CircleImage size={250} source={{uri: props.cover}}>
    <CircleImage size={250} source={require('../img/faded-blue.png')}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 180}}>
        <View style={{width: 150, alignItems: 'center'}}>
          <Text numberOfLines={1} style={{color: 'white', fontWeight: 'bold'}}>{props.title}</Text>
        </View>
        <View style={{width: 100, alignItems: 'center'}}>
          <Text numberOfLines={1} style={{color: colors.textFadedWhite, fontWeight: 'bold'}}>{props.author}</Text>
        </View>
      </View>
    </CircleImage>
  </CircleImage>
</View>);

class HeroBanner extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <PureListView
          data={this.props.clogs}
          renderRow={Row}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          minContentHeight={0}
          />
      </View>
    );
  }
}

export default HeroBanner;
