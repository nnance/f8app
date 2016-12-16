import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux'

import F8Button from 'F8Button';

import SecureContainer from './SecureContainer';
import NavBar from './NavBar';

import {styles as commonStyles, colors as commonColors} from './common';

import {changePassword, clearChangePasswordState} from '../../actions/changeProfile';
import ModalSpinner from './ModalSpinner';

class ChangePasswordScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      password: '',
      confirmPassword: '',
      error: null
    };
    this.props.clearChangePasswordState();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.changedPassword) {
      this.props.onBackPress && this.props.onBackPress();
    }
  }

  render() {
    return (<View style={styles.container}>
      <ModalSpinner visible={this.props.saving}/>
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
                  secureTextEntry={true}
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
                  secureTextEntry={true}
                  onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                  />
              </View>
            </View>
          </View>
          <View style={commonStyles.errorContainer}>
            <Text style={commonStyles.errorText}>{!!this.props.error ? this.props.error : this.state.error}</Text>
          </View>
          <F8Button style={styles.button} caption="เปลี่ยน Password" onPress={() => this.onChangePassword()}/>
        </View>
      </SecureContainer>
    </View>);
  }

  onChangePassword() {
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    this.props.clearChangePasswordState();
    this.setState({
      error: null
    });
    if (password !== confirmPassword) {
      this.setState({
        error: 'password not match'
      });
    }
    else {
      this.props.changePassword(password);
    }
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

const select = state => ({
  changingPassword: state.user.changingPassword,
  changedPassword: state.user.changedPassword,
  error: state.user.changePasswordError,
  saving: state.user.changingPassword
});

const actionsMaping = {
  changePassword,
  clearChangePasswordState
}

export default connect(select, actionsMaping)(ChangePasswordScreen);
