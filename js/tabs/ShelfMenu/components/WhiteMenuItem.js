import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import CircleImage from '../../../common/CircleImage';

const WhiteMenuItem = ({title, source, renderedButton, style, onPress}) => (
  <View style={[{flexDirection: 'row', paddingVertical: 10, paddingLeft: 5, alignItems: 'center'}, style]}>
    <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', alignItems: 'center'}}>
      <CircleImage source={source} size={25}/>
      <View style={{marginLeft: 10}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{title}</Text>
      </View>
    </TouchableOpacity>
    <View style={{flex: 1, paddingRight: 10, alignItems: 'flex-end', justifyContent: 'center'}}>
      {renderedButton}
    </View>
  </View>
);

export default WhiteMenuItem;
