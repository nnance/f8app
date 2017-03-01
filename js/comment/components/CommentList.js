import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import KeyboardAvoidingViewCustom from '../KeyboardAvoidingViewCustom';
import Comment from './Comment';

const { height, width } = Dimensions.get('window');
const style = StyleSheet.create({
  scrollView: {
    paddingTop: 10,
    backgroundColor: '#F9FAFB',
  },
});

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollViewHeight: height - 20 - 40 - 46, // marginTop: 20, header: 40, TextInput: 46
      contentHeight: 0,
    };
  }

  componentWillMount() {
    // Add keyboard change listener
    if (Platform.OS === 'ios') {
      this.subscriptions = [
        Keyboard.addListener('keyboardWillChangeFrame', this.onKeyboardChange),
      ];
    } else {
      this.subscriptions = [
        Keyboard.addListener('keyboardDidHide', this.onKeyboardChange),
        Keyboard.addListener('keyboardDidShow', this.onKeyboardChange),
      ];
    }
  }

  componentWillUnmount() {
    // Remove keyboard change listener
    this.subscriptions.forEach(sub => sub.remove());
  }

  onKeyboardChange = (e) => {
    const { startCoordinates, endCoordinates } = e;
    const keyboardHeight = startCoordinates.screenY - endCoordinates.screenY;
    const scrollViewHeight = this.state.scrollViewHeight - keyboardHeight;
    this.setState({
      scrollViewHeight,
    });

    if (scrollViewHeight < this.contentHeight && keyboardHeight < 0 && this.props.isPosting) {
      this.scrollView.scrollTo({ x: 0, y: this.contentHeight - scrollViewHeight + 10, animate: true });
    }

    this.props.onPostSuccess();
  }

  onContentSizeChange = (contentHeight) => {
    this.contentHeight = contentHeight;
  }

  render() {
    const { data } = this.props;
    // Create comment list component from bind data
    const Comments = data.map((comment, key) => (
      <Comment
        key={key}
        author={comment.author}
        text={comment.text}
        posted={comment.posted}
        liked={comment.liked}
      />
      ));

    return (
      <View>
        <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView; }}
          style={[style.scrollView, { height: this.state.scrollViewHeight }]}
          onContentSizeChange={(contentWidth, contentHeight) => this.onContentSizeChange(contentHeight)}
        >

          {Comments}
        </ScrollView>
      </View>
    );
  }
}

export default CommentList;
