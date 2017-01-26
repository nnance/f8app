import React from 'react';
import {
  Navigator
} from 'react-native';

import ClogiiTabView from './tabs/ClogiiTabView';
import Player from './player';

class ClogiiNavigator extends React.Component {
  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{page: 'main-tab', id: 3}}
        renderScene={this.renderScene.bind(this)}
        />
    );
  }

  renderScene(route, navigator) {
    if (route.page === 'main-tab') {
      return <ClogiiTabView navigator={navigator}/>;
    }
    if (route.page === 'player') {
      return <Player onBackPress={this.onBackPress.bind(this)} navigator={navigator} id={route.id}/>;
    }
  }

  onBackPress() {
    this.refs.navigator.pop();
  }
}

export default ClogiiNavigator;
