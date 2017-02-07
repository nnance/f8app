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
 */


const F8Button = require('F8Button');
const React = require('React');
const StyleSheet = require('StyleSheet');
const View = require('View');
const Navigator = require('Navigator');
const FriendsUsingApp = require('./FriendsUsingApp');
const SharingSettingsCommon = require('./SharingSettingsCommon');

const { setSharingEnabled } = require('../../actions');
const { connect } = require('react-redux');

class SharingSettingsModal extends React.Component {
  props: {
    navigator: Navigator;
    dispatch: () => void;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <SharingSettingsCommon style={{ marginTop: -50 }} />
          <FriendsUsingApp />
          <F8Button
            style={styles.button}
            caption="OK!"
            onPress={() => this.handleSetSharing(true)}
          />
          <F8Button
            type="secondary"
            caption="Not now"
            onPress={() => this.handleSetSharing(false)}
          />
        </View>
      </View>
    );
  }

  handleSetSharing(enabled: boolean) {
    this.props.dispatch(setSharingEnabled(enabled));
    this.props.navigator.pop();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 3,
    alignItems: 'center',
    overflow: 'hidden',
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    alignSelf: 'stretch',
  },
});

module.exports = connect()(SharingSettingsModal);
