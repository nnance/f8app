import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

import { BUTTOM_TAB_HEIGHT, colors } from './styles';
import { toHumanNumber } from './utils';

const menuIcon = {
  menu: require('../assets/common/icon/menu.png'),
  like: require('../assets/common/icon/like.png'),
  read: require('../assets/common/icon/read-button.png'),
  subBookmark: require('../assets/common/icon/sub-bookmark.png'),
  share: require('../assets/common/icon/share.png'),
};

const styles = StyleSheet.create({
  container: {
    height: BUTTOM_TAB_HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonMenuContainer: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    height: BUTTOM_TAB_HEIGHT - 20,
    resizeMode: 'contain',
  },
  menuText: {
    color: colors.textFadedGrey,
  },
});

const Menu = ({ style, children, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.buttonMenuContainer, style]}>
    {children}
  </TouchableOpacity>
);

class ButtomMenu extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Menu onPress={this.props.onMenuPress}>
          <Image style={styles.icon} source={menuIcon.menu} />
        </Menu>
        <Menu onPress={this.props.onLikePress} style={{ flex: 1.6, flexDirection: 'row', justifyContent: 'center' }}>
          <Image style={styles.icon} source={menuIcon.like} />
          <Text style={styles.menuText}>{toHumanNumber(this.props.likeCount)}</Text>
        </Menu>
        <Menu
          onPress={this.props.onCommentPress}
          style={{ flex: 1.6, flexDirection: 'row', justifyContent: 'center' }}
        >
          <Image style={styles.icon} source={menuIcon.read} />
          <Text style={styles.menuText}>{toHumanNumber(this.props.commentCount)}</Text>
        </Menu>
        <Menu onPress={this.props.onSubBookmarkPress}>
          <Image style={styles.icon} source={menuIcon.subBookmark} />
        </Menu>
        <Menu onPress={this.props.onSharePress}>
          <Image style={styles.icon} source={menuIcon.share} />
        </Menu>
      </View>
    );
  }
}

export default ButtomMenu;
