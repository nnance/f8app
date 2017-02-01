import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import {STATUS_BAR_HEIGHT, colors} from '../../common/styles';
import CircleImage from '../../common/CircleImage';
import {getCategoryIcon, getCategoryLogo} from '../../models/clog';

const CloseMenuButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={{fontSize: 25, color: 'white'}}>X</Text>
  </TouchableOpacity>
);

const Topic = ({title, children}) => (
  <View>
    <View style={{backgroundColor: colors.fadedGreyBackground, paddingVertical: 8, paddingHorizontal: 10}}>
      <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontWeight: 'bold', fontSize: 16}}>{title}</Text>
    </View>
    <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
      {children}
    </View>
  </View>
);

const FadedMenuItem = ({title, source}) => (
  <View style={{flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 5, alignItems: 'center'}}>
    <CircleImage source={source} size={25}/>
    <View style={{marginLeft: 10}}>
      <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontWeight: 'bold'}}>{title}</Text>
    </View>
  </View>
);

const WhiteMenuItem = ({title, source}) => (
  <View style={{flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 5, alignItems: 'center'}}>
    <CircleImage source={source} size={25}/>
    <View style={{marginLeft: 10}}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>{title}</Text>
    </View>
  </View>
);

class ShelfMenu extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(50, 31, 85, 1)'}}>
        <View style={{height: STATUS_BAR_HEIGHT}}/>
        <View style={styles.closeContainer}>
          <CloseMenuButton onPress={this.props.onClose}/>
        </View>
        <ScrollView>
          <Topic title="หมวดหมู่เรื่องราว">
            <WhiteMenuItem title="Gag Clog" source={getCategoryLogo('G')}/>
            <WhiteMenuItem title="Diary Clog" source={getCategoryLogo('D')}/>
            <WhiteMenuItem title="Novel Clog" source={getCategoryLogo('N')}/>
            <WhiteMenuItem title="Myth Clog" source={getCategoryLogo('M')}/>
          </Topic>
          <Topic title="ข้อมูล">
            <WhiteMenuItem title="David Beckham" source={getCategoryIcon('D')}/>
          </Topic>
          <Topic title="เกี่ยวกับ">
            <FadedMenuItem title="เกี่ยวกับ Clogii" source={getCategoryIcon('D')}/>
            <FadedMenuItem title="ข้อกำหนดในการใช้ Clogii" source={getCategoryIcon('D')}/>
          </Topic>
          <Topic title="ติดตาม">
            <FadedMenuItem title="Facebook" source={getCategoryIcon('D')}/>
            <FadedMenuItem title="Line" source={getCategoryIcon('D')}/>
            <FadedMenuItem title="Instagram" source={getCategoryIcon('D')}/>
          </Topic>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closeContainer: {
    padding: 15
  }
});

export default ShelfMenu;
