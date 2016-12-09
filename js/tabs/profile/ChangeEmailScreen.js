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

class ChangeEmailScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      email: '',
      confirmEmail: ''
    };
  }

  render() {
    return (<View style={styles.container}>
      <NavBar
        title="เปลี่ยน Email"
        onLeftPress={() => this.props.onBackPress && this.props.onBackPress()}
        >
      </NavBar>
      <SecureContainer onCheck={() => Promise.resolve()}>
        <View>
          <View style={styles.editorContainer}>
            <View style={commonStyles.row}>
              <View style={commonStyles.label}>
                <Text>New Email</Text>
              </View>
              <View style={commonStyles.inputContainer}>
                <TextInput style={{flex: 1, height: 40}}
                  placeholder="email"
                  autoCapitalize='none'
                  value={this.state.email || ''}
                  onChangeText={(email) => this.setState({email})}
                  />
              </View>
            </View>
            <View style={commonStyles.row}>
              <View style={commonStyles.label}>
                <Text>Confirm Email</Text>
              </View>
              <View style={commonStyles.inputContainer}>
                <TextInput style={{flex: 1, height: 40}}
                  placeholder="confirm email"
                  autoCapitalize='none'
                  value={this.state.confirmEmail || ''}
                  onChangeText={(confirmEmail) => this.setState({confirmEmail})}
                  />
              </View>
            </View>
          </View>
          <F8Button style={styles.button} caption="เปลี่ยน Email"/>
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

export default ChangeEmailScreen;
