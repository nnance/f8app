/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 * @providesModule F8SegmentedControl
 */


const React = require('React');
const StyleSheet = require('F8StyleSheet');
const { Text } = require('F8Text');
const TouchableOpacity = require('TouchableOpacity');
const View = require('View');
const Platform = require('Platform');

const HEIGHT = 32;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    ios: {
      paddingBottom: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    android: {
      paddingLeft: 60,
    },
  },
  button: {
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    ios: {
      height: HEIGHT,
      paddingHorizontal: 20,
      borderRadius: HEIGHT / 2,
      borderWidth: 1,
    },
    android: {
      paddingBottom: 6,
      paddingHorizontal: 10,
      borderBottomWidth: 3,
      marginRight: 10,
    },
  },
  label: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
  deselectedLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

class F8SegmentedControl extends React.Component {
  props: {
    values: Array<string>;
    selectionColor: ?string;
    selectedIndex: number;
    onChange: (newIndex: number) => void;
    style: any;
  };

  render() {
    const segments = this.props.values.map(
      (value, index) => (
        <Segment
          key={value}
          value={value}
          isSelected={index === this.props.selectedIndex}
          selectionColor={this.props.selectionColor || 'white'}
          onPress={() => this.props.onChange(index)}
        />
      ),
    );
    return (
      <View style={[styles.container, this.props.style]}>
        {segments}
      </View>
    );
  }
}

class Segment extends React.Component {
  props: {
    value: string;
    isSelected: boolean;
    selectionColor: string;
    onPress: () => void;
  };

  render() {
    let selectedButtonStyle;
    if (this.props.isSelected) {
      selectedButtonStyle = { borderColor: this.props.selectionColor };
    }
    let deselectedLabelStyle;
    if (!this.props.isSelected && Platform.OS === 'android') {
      deselectedLabelStyle = styles.deselectedLabel;
    }
    const title = this.props.value && this.props.value.toUpperCase();

    const accessibilityTraits = ['button'];
    if (this.props.isSelected) {
      accessibilityTraits.push('selected');
    }

    return (
      <TouchableOpacity
        accessibilityTraits={accessibilityTraits}
        activeOpacity={0.8}
        onPress={this.props.onPress}
        style={[styles.button, selectedButtonStyle]}
      >
        <Text style={[styles.label, deselectedLabelStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

module.exports = F8SegmentedControl;
