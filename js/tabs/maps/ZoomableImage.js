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


const Image = require('Image');
const React = require('React');
const ScrollView = require('ScrollView');
const StyleSheet = require('StyleSheet');
const TouchableWithoutFeedback = require('TouchableWithoutFeedback');

class ZoomableImage extends React.Component {
  props: {
    url: string;
  };

  constructor() {
    super();
    this.state = {
      lastTapTimestamp: 0,
      isZoomed: false,
    };

    this.onZoomChanged = this.onZoomChanged.bind(this);
    this.toggleZoom = this.toggleZoom.bind(this);
  }

  render() {
    return (
      <ScrollView
        ref="zoomable_scroll"
        onScroll={this.onZoomChanged}
        scrollEventThrottle={100}
        scrollsToTop={false}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        maximumZoomScale={4}
        centerContent
        contentContainerStyle={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={this.toggleZoom}>
          <Image
            style={styles.image}
            source={{ uri: this.props.url }}
          />
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }

  toggleZoom(e: any) {
    const timestamp = new Date().getTime();
    if (timestamp - this.state.lastTapTimestamp <= 500) {
      const { locationX, locationY } = e.nativeEvent;
      const size = this.state.isZoomed ? { width: 10000, height: 10000 } : { width: 0, height: 0 };
      this.refs.zoomable_scroll.scrollResponderZoomTo({ x: locationX, y: locationY, ...size });
    }
    this.setState({ lastTapTimestamp: timestamp });
  }

  onZoomChanged(e: any) {
    this.setState({ isZoomed: e.nativeEvent.zoomScale > 1 });
  }
}

var styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: Image.resizeMode.contain,
  },
});

module.exports = ZoomableImage;
