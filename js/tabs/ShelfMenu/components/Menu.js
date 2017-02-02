import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import {STATUS_BAR_HEIGHT, colors} from '../../../common/styles';
import CircleImage from '../../../common/CircleImage';
import {mapSource} from '../../../common/utils';
import {getCategoryIcon, getCategoryLogo} from '../../../models/clog';

import ClogMenuItem from './ClogMenuItem';
import WhiteMenuItem from './WhiteMenuItem';
import FadedMenuItem from './FadedMenuItem';
import styles from './styles';

const CloseMenuButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={require('../img/close.png')} style={{width: 15, height: 15, resizeMode: 'contain'}}/>
  </TouchableOpacity>
);

const Topic = ({title, children, style}) => (
  <View>
    <View style={[{backgroundColor: colors.fadedGreyBackground, paddingVertical: 4, paddingLeft: 10}]}>
      <Text style={{color: 'rgba(255, 255, 255, 0.2)', fontSize: 12}}>{title}</Text>
    </View>
    <View style={[{paddingVertical: 0, paddingLeft: 10}, style]}>
      {children}
    </View>
  </View>
);

class ShelfMenu extends React.Component {
  render() {
    const mockTags = [{id: '1', title: 'Chat Clog'}, {id: '2', title: 'Video Clog'}, {id: '3', title: 'Picture Clog'}, {id: '4', title: 'Pet Clog'}]
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(50, 31, 85, 1)'}}>
        <View style={{height: STATUS_BAR_HEIGHT}}/>
        <View style={styles.closeContainer}>
          <CloseMenuButton onPress={this.props.onClose}/>
        </View>
        <ScrollView>
          <Topic title="หมวดหมู่เรื่องราว">
            <ClogMenuItem tags={mockTags} title="Gag Clog" source={getCategoryIcon('G')}/>
            <ClogMenuItem tags={mockTags} title="Diary Clog" source={getCategoryIcon('D')}/>
            <ClogMenuItem tags={mockTags} title="Novel Clog" source={getCategoryIcon('N')}/>
            <ClogMenuItem tags={mockTags} title="Myth Clog" notShowBottomLine={true} source={getCategoryIcon('M')}/>
          </Topic>
          <Topic title="ข้อมูล">
            <WhiteMenuItem onPress={this.props.onProfilePress} title={this.props.user.name} source={mapSource(this.props.user.profilePicture)}/>
          </Topic>
          <Topic title="เกี่ยวกับ" style={{paddingVertical: 5}}>
            <FadedMenuItem onPress={this.props.onAboutClogiiPress} title="เกี่ยวกับ Clogii" source={require('../img/about.png')}/>
            <FadedMenuItem onPress={this.props.onPolicyPress} title="ข้อกำหนดในการใช้ Clogii" source={require('../img/policy.png')}/>
          </Topic>
          <Topic title="ติดตาม" style={{paddingVertical: 5}}>
            <FadedMenuItem onPress={this.props.onFacebookPress} title="Facebook" source={require('../img/fb.png')}/>
            <FadedMenuItem onPress={this.props.onLinePress} title="Line" source={require('../img/line.png')}/>
            <FadedMenuItem onPress={this.props.onInstagramPress} title="Instagram" source={require('../img/ig.png')}/>
          </Topic>
        </ScrollView>
      </View>
    );
  }
}

export default ShelfMenu;
