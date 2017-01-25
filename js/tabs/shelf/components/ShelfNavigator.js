import React from 'react';
import {
  Navigator,
  Text
} from 'react-native';

import Home from '../containers/Home';
import ClogCategory from '../containers/ClogCategory';
import ClogListView from '../containers/ClogListView';
import * as mockData from '../mockData';

import Book from '../../book';

const NotFound = () => <Text>not found</Text>;

class ShelfNavigator extends React.Component {

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{page: 'home', title: 'Whats News!'}}
        renderScene={this.renderScene.bind(this)}
        onWillFocus={this.onWillFocus.bind(this)}
      />
    );
  }

  onWillFocus(route) {
    this.emitFixBugListener(route.page);
  }

  emitFixBugListener(page) {
    if (!this.fixBugCallback || !this.fixBugCallback[page]) {
      return;
    }
    this.fixBugCallback[page].forEach(cb => cb());
  }

  addFixBugListener(page, cb) {
    if (!this.fixBugCallback) {
      this.fixBugCallback = {};
    }
    if (!this.fixBugCallback[page]) {
      this.fixBugCallback[page] = [];
    }
    this.fixBugCallback[page].push(cb);
  }

  removeFixBugListener(page, cb) {
    this.fixBugCallback[page] = this.fixBugCallback[page].filter(_cb => cb !== _cb);
  }

  renderScene(route, navigator) {
    if (!route) {
      return <NotFound/>;
    }
    if (route.page === 'home') {
      return <Home
        addFixBugListener={this.addFixBugListener.bind(this, route.page)}
        removeFixBugListener={this.removeFixBugListener.bind(this, route.page)}
        navigator={navigator}/>;
    }
    if (route.page === 'clog-category') {
      return <ClogCategory
        addFixBugListener={this.addFixBugListener.bind(this, route.page)}
        removeFixBugListener={this.removeFixBugListener.bind(this, route.page)}
        navigator={navigator}
        category={route.category}/>;
    }
    if (route.page === 'clog-list-view') {
      return <ClogListView
        addFixBugListener={this.addFixBugListener.bind(this, route.page)}
        removeFixBugListener={this.removeFixBugListener.bind(this, route.page)}
        navigator={navigator}
        title={route.title}
        category={route.category}
        orderBy={route.orderBy}
        tag={route.tag}/>;
    }
    if (route.page === 'book') {
      return <Book
        addFixBugListener={this.addFixBugListener.bind(this, route.page)}
        removeFixBugListener={this.removeFixBugListener.bind(this, route.page)}
        navigator={navigator}
        id={route.id}/>
    }
    return <NotFound/>;
  }
}

export default ShelfNavigator;
