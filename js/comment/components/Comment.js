import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';

const style = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFE0E3',
    backgroundColor: '#FFFFFF',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorThumbnail: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  authorName: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  commentText: {
    marginLeft: 40,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F4F5F6',
  },
  likedIcon: {
    marginLeft: 40,
    height: 13,
    width: 14,
    resizeMode: 'stretch',
  },
  likedNumber: {
    marginLeft: 10,
    color: '#ADAEAF',
  },
  timeText: {
    position: 'absolute',
    right: 0,
    color: '#ADAEAF',
  },
});

class CommentEditor extends React.Component {
  render() {
    return (
      <View style={{ position: 'absolute', marginLeft: 40, zIndex: 100, borderWidth: 1, padding: 10, backgroundColor: '#FFFFFF', borderColor: '#FF0000' }}>
        <Text>Edit</Text>
        <Text>Delete</Text>
      </View>
    );
  }
}

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
    };
  }

  onEditComment = () => {
    this.setState({
      showEdit: true,
    });
  }

  render() {
    const { posted, author, text, liked } = this.props;
    const relativePostedTime = moment(new Date(posted)).fromNow();

    return (
      <TouchableHighlight underlayColor="#D9D9D9" onLongPress={() => this.onEditComment()}>
        <View style={style.container}>
          <View style={style.authorContainer}>
            <Image style={style.authorThumbnail} source={{ uri: author.profileThumbnail }} />
            <Text style={style.authorName}>{author.name}</Text>
          </View>
          {this.state.showEdit ? <CommentEditor /> : null}
          <View>
            <Text style={style.commentText}>{text}</Text>
          </View>
          <View style={style.footerContainer}>
            <Image style={style.likedIcon} source={liked === 0 ? require('../img/icon-liked0.png') : require('../img/icon-like.png')} />
            <Text style={style.likedNumber}>{liked === 0 ? '' : liked}</Text>
            <Text style={style.timeText}>{relativePostedTime}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default Comment;
