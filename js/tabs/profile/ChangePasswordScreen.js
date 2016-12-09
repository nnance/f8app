import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';

import F8Button from 'F8Button';

import SecureContainer from './SecureContainer';
import NavBar from './NavBar';

import {styles as commonStyles, colors as commonColors} from './common';

class ChangePasswordScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      password: '',
      confirmPassword: ''
    };
  }

  render() {
    return (<View style={styles.container}>
      <NavBar
        title="เปลี่ยน Password"
        onLeftPress={() => this.props.onBackPress && this.props.onBackPress()}
        >
      </NavBar>
      <SecureContainer onCheck={() => Promise.resolve()}>
        <View>
          <View style={styles.editorContainer}>
            <View style={commonStyles.row}>
              <View style={commonStyles.label}>
                <Text>New password</Text>
              </View>
              <View style={commonStyles.inputContainer}>
                <TextInput style={{flex: 1, height: 40}}
                  placeholder="password"
                  autoCapitalize='none'
                  value={this.state.password || ''}
                  onChangeText={(password) => this.setState({password})}
                  />
              </View>
            </View>
            <View style={commonStyles.row}>
              <View style={commonStyles.label}>
                <Text>Confirm password</Text>
              </View>
              <View style={commonStyles.inputContainer}>
                <TextInput style={{flex: 1, height: 40}}
                  placeholder="confirm password"
                  autoCapitalize='none'
                  value={this.state.confirmPassword || ''}
                  onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                  />
              </View>
            </View>
          </View>
          <F8Button style={styles.button} caption="เปลี่ยน Password"/>
        </View>
      </SecureContainer>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonColors.greyBackground
  },
  editorContainer: {
    backgroundColor: 'white',
    marginTop: 10
  },
  button: {
    margin: 50
  }
});

export default ChangePasswordScreen;
