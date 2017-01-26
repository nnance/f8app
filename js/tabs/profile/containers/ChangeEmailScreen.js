import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import F8Button from 'F8Button';
import {connect} from 'react-redux';

import SecureContainer from '../components/SecureContainer';
import NavBar from '../components/NavBar';

import {styles as commonStyles} from '../common';
import {colors as commonColors} from '../../../common/styles';

import {changeEmail} from '../../../actions/changeProfile';
import ModalSpinner from '../../../common/ModalSpinner';

class ChangeEmailScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      email: '',
      confirmEmail: '',
      error: null,
      saving: false
    };
  }

  render() {
    return (<View style={styles.container}>
      <ModalSpinner visible={this.state.saving}/>
      <NavBar
        title="เปลี่ยน Email"
        onBackPress={this.props.onBackPress}
        />
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
                  autoCapitalize="none"
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
                  autoCapitalize="none"
                  value={this.state.confirmEmail || ''}
                  onChangeText={(confirmEmail) => this.setState({confirmEmail})}
                  />
              </View>
            </View>
          </View>
          <View style={commonStyles.errorContainer}>
            <Text style={commonStyles.errorText}>{this.state.error}</Text>
          </View>
          <F8Button style={styles.button} caption="เปลี่ยน Email" onPress={() => this.onChangeEmail()}/>
        </View>
      </SecureContainer>
    </View>);
  }

  onChangeEmail() {
    const email = this.state.email;
    const confirmEmail = this.state.confirmEmail;
    this.setState({
      error: null,
      saving: true
    });
    if (email !== confirmEmail) {
      this.setState({
        error: 'email not match',
        saving: false
      });
      return Promise.resolve();
    }
    return this.props.changeEmail(email).then(() => {
      this.setState({
        svaing: false
      });
      this.props.onBackPress && this.props.onBackPress();
    }).catch(error => {
      this.setState({
        saving: false,
        error: error.message
      });
    });
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

const actionsMaping = {
  changeEmail
};

export default connect(null, actionsMaping)(ChangeEmailScreen);
export {
  ChangeEmailScreen as Component
};
