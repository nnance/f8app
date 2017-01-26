import React from 'react';
import {
  Navigator,
  Text
} from 'react-native';

import Home from '../containers/Home';
import ClogCategory from '../containers/ClogCategory';
import ClogListView from '../containers/ClogListView';
import * as mockData from '../mockData';
import FixBugScrollViewNavigator from '../../../common/FixBugScrollViewNavigator';

import Book from '../../book';

const NotFound = () => <Text>not found</Text>;

class ShelfNavigator extends React.Component {

  render() {
    return (
      <FixBugScrollViewNavigator
        ref="navigator"
        initialRoute={{page: 'home', title: 'Whats News!'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    if (!route) {
      return <NotFound/>;
    }
    if (route.page === 'home') {
      return <Home
        navigator={navigator}/>;
    }
    if (route.page === 'clog-category') {
      return <ClogCategory
        navigator={navigator}
        category={route.category}/>;
    }
    if (route.page === 'clog-list-view') {
      return <ClogListView
        navigator={navigator}
        title={route.title}
        category={route.category}
        orderBy={route.orderBy}
        tag={route.tag}/>;
    }
    if (route.page === 'book') {
      return <Book
        navigator={navigator}
        goToPlayer={this.goToPlayer.bind(this)}
        id={route.id}/>
    }
    return <NotFound/>;
  }

  goToPlayer(id) {
    this.props.navigator.push({page: 'player', id})
  }
}

export default ShelfNavigator;
