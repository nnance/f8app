import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import KeyboardAvoidingViewCustom from './KeyboardAvoidingViewCustom';
import CommentHeader from './components/CommentHeader';
import CommentListA from './components/CommentList';
import MockData from './MockData';

const { height, width } = Dimensions.get('window');
const stylesTest = StyleSheet.create({
  expand: {
    height: 500,
  },
  resize: {
    height: 200,
  },
});

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      isPosting: false,
      comments: [],
    };
  }

  componentWillMount() {
    this.width = width;
    this.setState({
      comments: MockData,
    });
  }

  onSendMessage = (msg, scrollView) => {
    // Mock comment send message
    const newComment = {
      _id: 1234,
      posted: Date.now(),
      author: {
        id: 12345,
        name: 'Agela Mock',
        profileThumbnail: 'https://randomuser.me/api/portraits/men/73.jpg',
      },
      text: this.state.textInput,
      liked: 0,
    };

    this.setState({
      comments: [...this.state.comments, newComment],
      textInput: '',
      isPosting: true,
    });
    Keyboard.dismiss();
  }

  onPostSuccess = () => {
    this.setState({
      isPosting: false,
    });
  }


  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <CommentHeader />
        <CommentListA data={this.state.comments} isPosting={this.state.isPosting} onPostSuccess={this.onPostSuccess} />

        <KeyboardAvoidingViewCustom>
          <View style={{ flexDirection: 'row', alignItems: 'center', width, padding: 5, borderTopWidth: 1, borderTopColor: '#C8C8D0', backgroundColor: '#FFFFFF' }}>
            <Image style={{ width: 30, height: 20, resizeMode: 'stretch' }} source={require('./img/icon-camera.png')} />
            <View style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center', borderColor: '#CACBD2', borderWidth: 1, borderRadius: 5, height: 35, width: this.width - 50 }}>
              <TextInput
                style={{ marginLeft: 10, height: 35, width: 280 }}
                onChangeText={text => this.setState({ textInput: text })}
                placeholder="Write a comment..."
                value={this.state.textInput}
              />
              {
                this.state.textInput.length > 0 ?
                  <TouchableOpacity onPress={() => this.onSendMessage()}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'stretch' }} source={require('./img/icon-message.png')} />
                  </TouchableOpacity> : null
              }
            </View>
          </View>
        </KeyboardAvoidingViewCustom>
      </View>
    );
  }
}

export default CommentList;
