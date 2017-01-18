import React from 'react';
import {
  Image,
  View
} from 'react-native';

const CircleImage = props => {
  let {shadowRadius, shadowColor} = props;
  shadowRadius = shadowRadius || 0;
  shadowColor = shadowColor || 'rgba(0, 0, 0, 0)';
  return (<View style={{
    width: props.size,
    height: props.size,
  }}>
    <View style={{
        position: 'absolute',
        top: -shadowRadius / 2,
        left: -shadowRadius / 2,
        width: props.size + shadowRadius,
        height: props.size + shadowRadius,
        backgroundColor: shadowColor,
        borderRadius: (props.size + shadowRadius) / 2
      }}/>
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
