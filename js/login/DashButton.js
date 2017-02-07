import React from 'React';
import { View, Text, TouchableOpacity } from 'react-native';

import F8Colors from 'F8Colors';

export default class DashButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={{ flexDirection: 'row', padding: 10 }}>
        <View
          style={{
            height: 1,
            flex: 1,
            marginVertical: 12,
            marginHorizontal: 15,
            backgroundColor: F8Colors.fadedLightText,
          }}
        />
        <Text
          style={{ color: 'white' }}
        >
          {this.props.caption}
        </Text>
        <View
          style={{
            height: 1,
            flex: 1,
            marginVertical: 12,
            marginHorizontal: 15,
            backgroundColor: F8Colors.fadedLightText,
          }}
        />
      </TouchableOpacity>
    );
  }
}

export class DashButtonWithContainer extends React.Component {
  render() {
    const props = this.props;
    return (<View style={[{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }, props.style]}>
      <DashButton {...props} />
    </View>);
  }
}
