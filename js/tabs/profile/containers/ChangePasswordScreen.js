import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import F8Button from 'F8Button';

import SecureContainer from '../components/SecureContainer';
import NavBar from '../components/NavBar';

import { styles as commonStyles } from '../common';
import { colors as commonColors } from '../../../common/styles';

import { changePassword } from '../../../actions/changeProfile';
import ModalSpinner from '../../../common/ModalSpinner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonColors.nearlyWhiteBackground,
  },
  editorContainer: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  button: {
    margin: 50,
  },
});

class ChangePasswordScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      password: '',
      confirmPassword: '',
      error: null,
      saving: false,
    };
  }

  onChangePassword() {
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    this.setState({
      error: null,
      saving: true,
    });
    if (password !== confirmPassword) {
      this.setState({
        error: 'password not match',
        saving: false,
      });
      return Promise.resolve();
    }
    return this.props.changePassword(password).then(() => {
      this.setState({
        saving: false,
      });
      if (this.props.onBackPress) {
        this.props.onBackPress();
      }
    }).catch((error) => {
      this.setState({
        saving: false,
        error: error.message,
      });
    });
  }

  render() {
    return (<View style={styles.container}>
      <ModalSpinner visible={this.state.saving} />
      <NavBar
        title="เปลี่ยน Password"
        onBackPress={this.props.onBackPress}
      />
      <SecureContainer onCheck={() => Promise.resolve()}>
        <View>
          <View style={styles.editorContainer}>
            <View style={commonStyles.row}>
              <View style={commonStyles.label}>
                <Text>New password</Text>
              </View>
              <View style={commonStyles.inputContainer}>
                <TextInput
                  style={{ flex: 1, height: 40 }}
                  placeholder="password"
                  autoCapitalize="none"
                  value={this.state.password || ''}
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                />
              </View>
            </View>
            <View style={commonStyles.row}>
              <View style={commonStyles.label}>
                <Text>Confirm password</Text>
              </View>
              <View style={commonStyles.inputContainer}>
                <TextInput
                  style={{ flex: 1, height: 40 }}
                  placeholder="confirm password"
                  autoCapitalize="none"
                  value={this.state.confirmPassword || ''}
                  secureTextEntry
                  onChangeText={confirmPassword => this.setState({ confirmPassword })}
                />
              </View>
            </View>
          </View>
          <View style={commonStyles.errorContainer}>
            <Text style={commonStyles.errorText}>{this.state.error}</Text>
          </View>
          <F8Button style={styles.button} caption="เปลี่ยน Password" onPress={() => this.onChangePassword()} />
        </View>
      </SecureContainer>
    </View>);
  }
}

const actionsMaping = {
  changePassword,
};

export default connect(null, actionsMaping)(ChangePasswordScreen);
export {
  ChangePasswordScreen as Component,
};
