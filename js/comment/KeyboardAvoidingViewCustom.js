import React from 'react';
import {
	View,
	Keyboard,
	LayoutAnimation,
	TouchableOpacity,
	Text,
	StyleSheet,
	Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  start: {
    position: 'absolute',
    bottom: 0,
  },
  end: {
    position: 'absolute',
    bottom: 300,
  },
});

class KeyboardAvoidingViewCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerStyle: styles.start,
      bottom: 0,
    };
  }

  componentWillMount() {
    this.onKeyboardChangeListener = Keyboard.addListener('keyboardWillChangeFrame', this._onKeyboardChange);
  }

  _onKeyboardChange = (e) => {
    const { duration, easing, endCoordinates } = e;
		// const height = this.relativeKeyboardHeight(endCoordinates)
    const keyboardFrame = {
      start: e.startCoordinates,
      end: e.endCoordinates,
      duration: e.duration,
    };

    const offsetY = keyboardFrame.start.screenY - keyboardFrame.end.screenY;
    this.setState({
      bottom: this.state.bottom + offsetY,
    });
  }

  componentWillUnmount() {
    this._onKeyboardChange.remove();
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  _onPress() {
    this.setState({
      bottom: 300,
    });
  }

  render() {
		// this.frame = event.nativeEvent.layout

    const positionStyle = { bottom: this.state.bottom };
    return (
      <View style={[{ position: 'absolute' }, positionStyle]}>
        {this.props.children}
      </View>
    );
  }
}

export default KeyboardAvoidingViewCustom;
