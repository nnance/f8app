import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import F8Button from 'F8Button';

import {colors as commonColors} from '../../../common/styles';

class SecureContainer extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      passed: false,
      password: '',
      error: null
    };
  }

  render() {
    if (this.state.passed) {
      return <View key="passed">{this.props.children}</View>;
    }
    return (<View key="secure" style={[styles.container, this.props.style]}>
      <View style={styles.spaceFlex}/>
      <View style={styles.innerContainer}>
        <Text style={styles.error}>
          {this.state.error}
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={(password) => this.setState({password})}
            style={styles.input}
            placeholder="current password"
            value={this.state.password || ''}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonBox}>
          <F8Button caption="Next" onPress={() => {
            return this.props.onCheck(this.state.password).then(() => {
              this.setState({passed: true});
            }).catch(error => {
              this.setState({
                error: error.message
              });
            });
          }}/>
        </View>
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: commonColors.greyBackground
  },
  spaceFlex: {
    flex: 1
  },
  error: {
    margin: 10,
    alignSelf: 'center',
    color: 'red'
  },
  innerContainer: {
    flex: 8
  },
  input: {
    flex: 1,
    height: 40
  },
  inputBox: {
    height: 80,
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 0.5,
    borderColor: commonColors.greyBorder
  },
  submitBox: {
    flex: 1,
    backgroundColor: 'blue'
  },
  buttonBox: {
    padding: 60
  }
});

export default SecureContainer;
