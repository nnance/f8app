import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

const FadedMenuItem = ({ title, source, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 5, alignItems: 'center' }}>
    <Image source={source} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
    <View style={{ marginLeft: 10 }}>
      <Text style={[{ fontSize: 13 }, styles.fadedWhiteText]} numberOfLines={1}>{title}</Text>
    </View>
  </TouchableOpacity>
);

export default FadedMenuItem;
