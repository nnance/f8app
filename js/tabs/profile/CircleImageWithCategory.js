import React from 'react';

import CircleImage from '../../common/CircleImage';
import {
  Image,
  Text,
  View
} from 'react-native';

export default (props) => (<View style={{width: props.size, height: props.size}}>
  <CircleImage {...props} style={[props.style, {backgroundColor: 'transparent'}]}>
  </CircleImage>
  <Image
    source={props.categorySource}
    style={{
      position: 'absolute',
      bottom: props.size / 32,
      right: props.size / 32,
      width: props.size / 4,
      height: props.size / 4
    }}
  />
</View>);
