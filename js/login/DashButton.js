import React from 'React';
import {Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import ClogiiButton from 'ClogiiButton';
import styles from './styles';

import F8Colors from 'F8Colors';

export default class DashButton extends React.Component {
  render() {
    return (
        <TouchableOpacity onPress={() => this.props.onPress && this.props.onPress()} style={{flexDirection: 'row', padding: 10}}>
          <View style={{
              height: 1,
              flex: 1,
              marginVertical: 12,
              marginHorizontal: 15,
              backgroundColor: F8Colors.fadedLightText
            }}/>
          <Text
            style={{color: 'white'}}
            >
            {this.props.caption}
          </Text>
          <View style={{
              height: 1,
              flex: 1,
              marginVertical: 12,
              marginHorizontal: 15,
              backgroundColor: F8Colors.fadedLightText
            }}/>
        </TouchableOpacity>
    );
  }
}

export const DashButtonWithContainer = (props) => (<View style={[{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}, props.style]}>
  <DashButton {...props}/>
</View>);
