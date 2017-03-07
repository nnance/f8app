import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Navbar from './NavBar';
import NotificationsList from './NotificationsList';


class NotificationsHome extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <Navbar
          renderRightMenu={() => (
            <TouchableOpacity><Image style={{ height: 20, resizeMode: 'contain' }} source={require('../../../assets/common/pink-search.png')} /></TouchableOpacity>
          )}
          renderTitle={() => (
            <Image style={{ width: 80, height: 30, resizeMode: 'contain' }} source={require('../../../assets/notification/title.png')} />
          )}
          titleStyle={{
            flex: 1,
            alignItems: 'flex-start',
          }}
        />
        <NotificationsList
          goToBook={this.props.goToBook}
        />
      </View>
    );
  }
}

export default NotificationsHome;
