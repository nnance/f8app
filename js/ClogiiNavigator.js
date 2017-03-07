import React from 'react';
import {
  Linking,
} from 'react-native';
import { parse } from 'query-string';

import FixBugScrollViewNavigator from './common/FixBugScrollViewNavigator';
import { withTracking } from './common/navigateTracking';

import ClogiiTabView from './tabs/ClogiiTabView';
import Reader from './reader';
import Book from './book';
import Comment from './comment';

class ClogiiNavigator extends React.Component {
  constructor(...args) {
    super(...args);
    this.onOpenURL = this.onOpenURL.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.parseURL = this.parseURL.bind(this);
    this.goToPlayer = this.goToPlayer.bind(this);
    this.goToBook = this.goToBook.bind(this);
    this.goBack = this.goBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount() {
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.redirectTo(url);
      }
    }).catch((error) => {
      console.error('initial url error: ', error);
    });
    Linking.addEventListener('url', this.onOpenURL);
    this.goToPlayer("912142336485843652482056");
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.onOpenURL);
  }

  onOpenURL(event) {
    this.redirectTo(event.url);
  }

  redirectTo(url) {
    const { method, query } = this.parseURL(url);
    if (method === 'player' && query.id) {
      this.goToPlayer(query.id);
    }
    if (method === 'book' && query.id) {
      this.goToBook(query.id);
    }
  }

  parseURL(fUrl) {
    const url = fUrl;
    try {
      const liftedHost = url.split(':').length > 1 ? url.split(':')[1] : url.split(':')[0];
      const splited = liftedHost.split('?');
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
    this.props.navigate(`player?id=${id}`);
  }

  goToBook(id) {
    this.navigator.push({ page: 'book', id });
    this.props.navigate(`book?id=${id}`);
  }

  goBack() {
    this.navigator.pop();
    this.props.navigateBack();
  }

  renderScene(route) {
    if (route.page === 'main-tab') {
      return (<ClogiiTabView
        goToPlayer={this.goToPlayer}
        goToBook={this.goToBook}
        redirectTo={this.redirectTo}
      />);
    }
    if (route.page === 'player') {
      return <Reader onBackPress={this.goBack} id={route.id} />;
    }
    if (route.page === 'book') {
      return (<Book
        onBackPress={this.goBack}
        goToPlayer={this.goToPlayer}
        id={route.id}
      />);
    }
    if (route.page === 'comment') {
      return (
        <Comment
          onBackPress={this.goBack}
          id={route.id}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <FixBugScrollViewNavigator
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

export default withTracking(ClogiiNavigator);
export {
  ClogiiNavigator as Component,
};
