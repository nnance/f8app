

import React from 'React';
import { Image, View, Text } from 'react-native';

import styles from './styles';

export default ({ goToLogin, successText }) => (
  <Image
    style={styles.container}
    source={require('../assets/login/email-bg.png')}
  >
    <View style={styles.inputSession}>
      <Text style={styles.successText} onPress={goToLogin}>{successText}, go back to login</Text>
    </View>
  </Image>
);
