import React from 'react';
import {
  Navigator,
  Linking,
} from 'react-native';
import { parse } from 'query-string';

import ClogiiTabView from './tabs/ClogiiTabView';
import Player from './player';
import Book from './book';

class ClogiiNavigator extends React.Component {
  constructor(...args) {
    super(...args);
    this.onOpenURL = this.onOpenURL.bind(this);
    this.fromURL = this.fromURL.bind(this);
    this.parseURL = this.parseURL.bind(this);
    this.goToPlayer = this.goToPlayer.bind(this);
    this.goToBook = this.goToBook.bind(this);
    this.goBack = this.goBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount() {
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.fromURL(url);
      }
    }).catch((error) => {
      console.error('initial url error: ', error);
    });
    Linking.addEventListener('url', this.onOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.onOpenURL);
  }

  onOpenURL(event) {
    this.fromURL(event.url);
  }

  fromURL(url) {
    const { method, query } = this.parseURL(url);
    if (method === 'player' && query.id) {
      this.goToPlayer(query.id);
    }
  }

  parseURL(fUrl) {
    let url = fUrl;
    try {
      url = url.split(':')[1];
      const splited = url.split('?');
      let method = splited[0];
      const queryS = splited[1];
      const query = parse(queryS);
      if (method.indexOf('//') === 0) {
        method = method.slice(2);
      }
      return { method, query };
    } catch (error) {
      console.error('parse url error: ', error);
    }
    return {};
  }

  goToPlayer(id) {
    this.navigator.push({ page: 'player', id });
  }

  goToBook(id) {
    this.navigator.push({ page: 'book', id });
  }

  goBack() {
    this.navigator.pop();
  }

  renderScene(route) {
    if (route.page === 'main-tab') {
      return <ClogiiTabView goToBook={this.goToBook} />;
    }
    if (route.page === 'player') {
      return <Player onBackPress={this.goBack} id={route.id} />;
    }
    if (route.page === 'book') {
      return (<Book
        onBackPress={this.goBack}
        goToPlayer={this.goToPlayer}
        id={route.id}
      />);
    }
    return null;
  }

  render() {
    return (
      <Navigator
        ref={
          (node) => {
            this.navigator = node;
          }
        }
        initialRoute={{ page: 'main-tab', id: 3 }}
        renderScene={this.renderScene}
      />
    );
  }
}

export default ClogiiNavigator;
