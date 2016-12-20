import React from 'React';
import {Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import ClogiiButton from 'ClogiiButton';
import styles from './styles';

export default class SignupButton extends React.Component {
  render() {
    return (
        <TouchableOpacity onPress={() => this.props.onPress && this.props.onPress()}>
          <Text
            style={{paddingVertical: 40, color: 'white'}}
            >
            ––––––––––– สร้างบัญชีใหม่ ––––––––––
          </Text>
        </TouchableOpacity>
    );
  }
}

export const SignupButtonWithContainer = (props) => (<View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
  <SignupButton {...props}/>
</View>);
