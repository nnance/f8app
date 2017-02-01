import React from 'react';
import {
  Navigator,
  Linking
} from 'react-native';
import {parse} from 'query-string';

import ClogiiTabView from './tabs/ClogiiTabView';
import Player from './player';

class ClogiiNavigator extends React.Component {
  constructor(...args) {
    super(...args);
    this.onOpenURL = this.onOpenURL.bind(this);
  }

  componentDidMount() {
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.fromURL(url);
      }
    }).catch(error => {
      console.error('initial url error: ', error);
    });
    Linking.addEventListener('url', this.onOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.onOpenURL);
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{page: 'main-tab', id: 3}}
        renderScene={this.renderScene.bind(this)}
        />
    );
  }

  onOpenURL(event) {
    this.fromURL(event.url);
  }

  fromURL(url) {
    let {method, query} = this.parseURL(url);
    if (method === 'player' && query.id) {
      this.refs.navigator.push({page: 'player', id: query.id});
    }
  }

  parseURL(url) {
    try {
      url = url.split(':')[1];
      let [method, queryS] = url.split('?');
      let query = parse(queryS);
      if (method.indexOf('//') === 0) {
        method = method.slice(2);
      }
      return {method, query};
    }
    catch (error) {
      console.error('parse url error: ', error);
    }
    return {};
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
