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

class TopClog extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Image source={require('../img/top-clog-bg.png')} style={{flex: 1, flexDirection: 'row', resizeMode: 'stretch', width: undefined}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 10}}>
            <CircleImageWithCategory
              source={mapSource(require('../img/B.png'))}
              categorySource={mapSource(require('../img/D.png'))}
              size={130}
              imageStyle={{
                borderWidth: 3,
                borderColor: colors.pinkBorder
              }}
            />
          </View>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'flex-start'}}>
            <View style={{height: 100, paddingHorizontal: 20}}>
              <View style={{flex: 2}}>
                <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold', lineHeight: 12}}>
                  แมค เดมอน ตะลุยอวกาศ
                </Text>
                <Text style={{fontSize: 11, color: colors.textFadedWhite}}>
                  Steve Jobs
                </Text>
              </View>
              <View style={{flex: 4, paddingTop: 10}}>
                <Text style={{fontSize: 11, color: colors.textFadedWhite, lineHeight: 12}} numberOfLines={4}>
                  The martin กำลัง บลาๆๆๆๆๆ บลาๆๆๆๆๆ บลาๆๆๆๆๆ บลาๆๆๆๆๆ บลาๆๆๆๆๆ บลาๆๆๆๆๆ บลาๆๆๆๆๆ บลาๆๆๆๆๆ บลาๆๆๆๆๆ บลาๆๆๆๆๆ บลาๆๆๆๆๆ บลาๆๆๆๆๆ
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <View style={{padding: 10}}>
                  <BorderButton caption="อ่าน" textStyle={{color: 'rgba(60, 30, 90, 1)'}}/>
                </View>
              </View>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

export default TopClog;
