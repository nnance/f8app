import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import FixBugScrollViewNavigator from '../../../common/FixBugScrollViewNavigator';
import NotificationsHome from './NotificationsHome';

class NotiNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, navigator) {
    if (route.page === 'notificationsHome') {
      return (
        <NotificationsHome
          goToBook={this.props.goToBook}
          navigator={navigator}
        />
      );
    }
    return (<View><Text>Not Found</Text></View>);
  }

  render() {
    return (
      <FixBugScrollViewNavigator
        initialRoute={{ page: 'notificationsHome' }}
        renderScene={this.renderScene}
      />
    );
  }
}

export default NotiNavigator;
