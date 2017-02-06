import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
import gql from 'graphql-tag';

import {colors} from '../../../common/styles';
import CircleImageWithCategory from '../../../common/CircleImageWithCategory';
import BorderButton from '../../../common/BorderButton';
import {mapSource} from '../../../common/utils';
import {getCategoryIcon} from '../../../models/clog';

class RecommendedClog extends React.Component {
  render() {
    const clog = this.props.clog || {};
    return (
      <View style={{flex: 1}}>
        <Image source={require('../img/top-clog-bg.png')} style={{flex: 1, flexDirection: 'row', resizeMode: 'stretch', width: undefined, height: undefined}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 10}}>
            <CircleImageWithCategory
              source={mapSource(clog.preview)}
              category={clog.category}
              size={130}
              shadowRadius={5}
              shadowColor={colors.fadedWhite}
            />
          </View>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'flex-start'}}>
            <View style={{height: 100, paddingHorizontal: 20, width: 250}}>
              <View style={{flex: 2}}>
                <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold', lineHeight: 14}}>
                  {clog.title}
                </Text>
                <Text style={{fontSize: 11, color: colors.textFadedWhite}}>
                  {clog.author ? clog.author.name : null}
                </Text>
              </View>
              <View style={{flex: 4, paddingTop: 10}}>
                <Text style={{fontSize: 11, color: colors.textFadedWhite, lineHeight: 12}} numberOfLines={4}>
                  {clog.review}
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
    this.props.goToBook && this.props.goToBook(this.props.id)
  }
}

RecommendedClog.fragments = {
  clog: gql`
    fragment RecommendedClog on Clog {
      title
      preview
      category
      author {
        name
      }
      review
    }
  `
};

export default RecommendedClog;
