import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const WhiteMenuItem = ({ icon, title, renderedButton, style, onPress }) => (
  <View style={[{ flexDirection: 'row', paddingVertical: 10, paddingLeft: 5, alignItems: 'center' }, style]}>
    <TouchableOpacity onPress={onPress} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 25, height: 25 }}>
        {icon}
      </View>
      <View style={{ flex: 1, paddingLeft: 10 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }} numberOfLines={1}>{title}</Text>
      </View>
    </TouchableOpacity>
    <View style={{ width: 50, marginRight: 10, alignItems: 'flex-end', justifyContent: 'center' }}>
      {renderedButton}
    </View>
  </View>
);

export default WhiteMenuItem;
