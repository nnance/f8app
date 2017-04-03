import React from 'react';
import {
  Image,
  View,
} from 'react-native';

import CircleImage from './CircleImage';

export default props => (<View style={{ width: props.size, height: props.size }}>
  <CircleImage {...props} style={[props.imageStyle, { backgroundColor: 'transparent' }]}>
    {props.children}
  </CircleImage>
  <Image
    source={props.subSource}
    style={[{
      position: 'absolute',
      bottom: props.size / 32,
      right: props.size / 32,
      width: props.size / 4,
      height: props.size / 4,
    }, props.categoryStyle]}
  />
</View>);
