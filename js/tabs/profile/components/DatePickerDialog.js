import React from 'react';
import {
  DatePickerIOS,
  DatePickerAndroid,
  Modal,
  StyleSheet,
  View,
  Platform,
} from 'react-native';

import Button from 'Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dialogContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    width: 300,
    borderWidth: 0.2,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
});

class DatePickerDialog extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      currentDate: this.props.currentDate || new Date(),
      visible: false,
    };
    this.iResolve = null;
    this.iReject = null;
  }

  onOK() {
    if (this.iResolve) {
      this.iResolve(this.state.currentDate);
    }
    this.hide();
  }

  onCancel() {
    if (this.iReject) {
      this.iReject();
    }
    this.hide();
  }

  open(setDate) {
    const startDate = setDate || this.state.currentDate;
    if (Platform.OS === 'android') {
      return DatePickerAndroid.open({ date: startDate }).then((response) => {
        const { year, month, day } = response;
        return new Date(year, month, day);
      });
    }
    if (this.state.visible) {
      return this.iResolve;
    }
    this.setState({
      currentDate: startDate,
      visible: true,
    });
    return new Promise((resolve, reject) => {
      this.iResolve = resolve;
      this.iReject = reject;
    });
  }

  hide() {
    this.iResolve = null;
    this.iReject = null;
    this.setState({
      visible: false,
    });
  }

  render() {
    if (Platform.OS === 'android') {
      return null;
    }
    return (<Modal
      transparent
      visible={this.state.visible}
    >
      <View style={styles.container}>
        <View style={styles.dialogContainer}>
          <DatePickerIOS mode="date" date={this.state.currentDate} onDateChange={date => this.setState({ currentDate: date })} />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="ok" onPress={() => this.onOK()} />
            </View>
            <View style={styles.button}>
              <Button title="cancel" onPress={() => this.onCancel()} />
            </View>
          </View>
        </View>
      </View>
    </Modal>);
  }
}

export default DatePickerDialog;
