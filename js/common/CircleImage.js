import React from 'react';
import {
  Image,
  View
} from 'react-native';

const CircleImage = props => {
  return (<Image {...props}
    style={[{
      width: props.size,
      height: props.size,
      borderRadius: props.size / 2,
    }, props.style]}/>);
}

export default CircleImage;
