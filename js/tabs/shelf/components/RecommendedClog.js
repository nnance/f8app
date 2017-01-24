import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';

import {colors} from '../../../common/styles';
import CircleImageWithCategory from '../../../common/CircleImageWithCategory';
import BorderButton from '../../../common/BorderButton';
import {mapSource} from '../../../common/utils';
import {getCategoryIcon} from '../../../models/clog';

class RecommendedClog extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Image source={require('../img/top-clog-bg.png')} style={{flex: 1, flexDirection: 'row', resizeMode: 'stretch', width: undefined, height: undefined}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 10}}>
            <CircleImageWithCategory
              source={mapSource(this.props.preview)}
              category={this.props.category}
              size={130}
              shadowRadius={5}
              shadowColor={colors.fadedWhite}
            />
          </View>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'flex-start'}}>
            <View style={{height: 100, paddingHorizontal: 20, width: 250}}>
              <View style={{flex: 2}}>
                <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold', lineHeight: 14}}>
                  {this.props.title}
                </Text>
                <Text style={{fontSize: 11, color: colors.textFadedWhite}}>
                  {this.props.author ? this.props.author.name : null}
                </Text>
              </View>
              <View style={{flex: 4, paddingTop: 10}}>
                <Text style={{fontSize: 11, color: colors.textFadedWhite, lineHeight: 12}} numberOfLines={4}>
                  {this.props.review}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <BorderButton onPress={this.onReadPress.bind(this)} caption="อ่าน" containerStyle={{height: 18}} textStyle={{color: 'rgba(60, 30, 90, 1)'}}/>
              </View>
            </View>
          </View>
        </Image>
      </View>
    );
  }

  onReadPress() {
    this.props.navigator && this.props.navigator.push({page: 'book', id: this.props.id})
  }
}

export default RecommendedClog;
