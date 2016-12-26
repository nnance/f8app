import React from 'react';
import {
  DatePickerIOS,
  DatePickerAndroid,
  Modal,
  StyleSheet,
  View,
  Text,
  Platform
} from 'react-native';

import Button from 'Button';

class DatePickerDialog extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      currentDate: this.props.currentDate || new Date(),
      visible: false
    };
    this._resolve = null;
    this._reject = null;
  }

  open(currentDate) {
    currentDate = currentDate || this.state.currentDate;
    if (Platform.OS === 'android') {
      return DatePickerAndroid.open({date: currentDate}).then(response => {
        const {action, year, month, day} = response;
        return new Date(year, month, day);
      });
    }
    if (this.state.visible) {
      return;
    }
    this.setState({
      currentDate,
      visible: true
    });
    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  hide() {
    this._resolve = null;
    this._reject = null;
    this.setState({
      visible: false
    });
  }

  onOK() {
    this._resolve && this._resolve(this.state.currentDate);
    this.hide();
  }

  onCancel() {
    this._reject && this._reject();
    this.hide();
  }

  render() {
    if (Platform.OS === 'android') {
      return null;
    }
    return (<Modal
        transparent={true}
        visible={this.state.visible}
      >
        <View style={styles.container}>
          <View style={styles.dialogContainer}>
            <DatePickerIOS mode="date" date={this.state.currentDate} onDateChange={(date) => this.setState({currentDate: date})}/>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title='ok' onPress={() => this.onOK()}/>
              </View>
              <View style={styles.button}>
                <Button title='cancel' onPress={() => this.onCancel()}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  dialogContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    width: 300,
    borderWidth: 0.2,
    borderColor: 'rgba(0, 0, 0, 0.3)'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flex: 1
  }
});

export default DatePickerDialog;
