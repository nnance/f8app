import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';

import F8Button from 'F8Button';
import {connect} from 'react-redux';

import SecureContainer from './SecureContainer';
import NavBar from './NavBar';

import {styles as commonStyles, colors as commonColors} from './common';

import {changeEmail, clearChangeEmailState} from '../../actions/changeProfile';
import ModalSpinner from './ModalSpinner';

class ChangeEmailScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      email: '',
      confirmEmail: '',
      error: null
    };
    this.props.clearChangeEmailState();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.changedEmail) {
      this.props.onBackPress && this.props.onBackPress();
    }
  }

  render() {
    return (<View style={styles.container}>
      <ModalSpinner visible={this.props.saving}/>
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
          <View style={commonStyles.errorContainer}>
            <Text style={commonStyles.errorText}>{!!this.props.error ? this.props.error : this.state.error}</Text>
          </View>
          <F8Button style={styles.button} caption="เปลี่ยน Email" onPress={() => this.onChangeEmail()}/>
        </View>
      </SecureContainer>
    </View>);
  }

  onChangeEmail() {
    const email = this.state.email;
    const confirmEmail = this.state.confirmEmail;
    this.props.clearChangeEmailState();
    this.setState({
      error: null
    });
    if (email !== confirmEmail) {
      this.setState({
        error: 'email not match'
      });
      return;
    }
    this.props.changeEmail(email);
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
  changingEmail: state.user.changingEmail,
  changedEmail: state.user.changedEmail,
  error: state.user.changeEmailError,
  saving: state.user.changingEmail
});

const actionsMaping = {
  clearChangeEmailState,
  changeEmail
};

export default connect(select, actionsMaping)(ChangeEmailScreen);
