import React from 'react';
import {
  View,
  Text
} from 'react-native';
import FixBugScrollViewNavigator from '../../../common/FixBugScrollViewNavigator';
import NotificationsHome from './NotificationsHome';

class NotiNavigator extends React.Component {
  renderScene(route, navigator) {
    if (route.page === 'notificationsHome') {
      return (
        <NotificationsHome navigator={navigator}/>
      )
    }
  }
  render() {
    return (
      <FixBugScrollViewNavigator
        ref="navigator"
        initialRoute={{page: 'notificationsHome'}}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }
}

export default NotiNavigator
