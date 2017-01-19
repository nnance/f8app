import React from 'react';
import {
  Navigator,
  Text
} from 'react-native';

import Home from '../containers/Home';
import ClogCategory from '../containers/ClogCategory';
import ClogListView from '../containers/ClogListView';
import * as mockData from '../mockData';

const NotFound = () => <Text>not found</Text>;

class ShelfNavigator extends React.Component {
  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={{page: 'clog-list-view', title: 'Whats News!'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    if (!route) {
      return <NotFound/>;
    }
    if (route.page === 'home') {
      return <Home navigator={navigator}/>;
    }
    if (route.page === 'clog-category') {
      return <ClogCategory navigator={navigator} category={route.category}/>;
    }
    if (route.page === 'clog-list-view') {
      return <ClogListView title={route.title}/>;
    }
    return <NotFound/>;
  }
}

export default ShelfNavigator;
