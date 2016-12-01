import React from 'react';
import {
  Image
} from 'react-native';

const CircleImage = props => (<Image {...props}
  style={[{
    width: props.size,
    height: props.size,
    borderRadius: props.size / 2
  }, props.style]}>
</Image>);

export default CircleImage;
