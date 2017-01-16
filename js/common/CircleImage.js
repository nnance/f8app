import React from 'react';
import {
  Image,
  View
} from 'react-native';

const CircleImage = props => {
  return (<View style={{width: props.size, height: props.size}}>
    <Image {...props}
    style={[{
      width: props.size,
      height: props.size,
      borderRadius: props.size / 2,
    }, props.style]} children={null}/>
  <View
      style={{
        width: props.size,
        height: props.size,
        position: 'absolute',
        top: 0,
        left: 0}}>
      {props.children}
    </View>
  </View>);
}

export default CircleImage;
