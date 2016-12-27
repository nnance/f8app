import React from 'react';

import {
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

export default ({visible}) => (<Modal transparent={true} visible={visible}>
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
    <ActivityIndicator
      style={[{height: 80}]}
      size="large"
      />
  </View>
</Modal>);
