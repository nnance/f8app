import React from 'react';
import {
  Navigator,
  Text,
} from 'react-native';

import Home from '../containers/Home';
import ClogCategory from '../containers/ClogCategory';
import ClogListView from '../containers/ClogListView';
import * as mockData from '../mockData';
import FixBugScrollViewNavigator from '../../../common/FixBugScrollViewNavigator';

const NotFound = () => <Text>not found</Text>;

class ShelfNavigator extends React.Component {

  render() {
    return (
      <FixBugScrollViewNavigator
        ref="navigator"
        initialRoute={{ page: 'home' }}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    if (!route) {
      return <NotFound />;
    }
    if (route.page === 'home') {
      return (<Home
        onOpenShelfMenu={this.props.onOpenShelfMenu}
        goToBook={this.props.goToBook}
        goToClogCategory={this.goToClogCategory.bind(this)}
        goToClogListView={this.goToClogListView.bind(this)}
      />);
    }
    if (route.page === 'clog-category') {
      return (<ClogCategory
        onBackPress={this.goBack.bind(this)}
        goToBook={this.props.goToBook}
        goToClogListView={this.goToClogListView.bind(this)}
        category={route.category}
      />);
    }
    if (route.page === 'clog-list-view') {
      return (<ClogListView
        onBackPress={this.goBack.bind(this)}
        title={route.title}
        category={route.category}
        orderBy={route.orderBy}
        goToBook={this.props.goToBook}
        tag={route.tag}
      />);
    }
    return <NotFound />;
  }

  goBack() {
    this.refs.navigator.pop();
  }

  goToClogCategory(category) {
    this.refs.navigator.push({ page: 'clog-category', category });
  }

  goToClogListView(options) {
    this.refs.navigator.push({ page: 'clog-list-view', ...options });
  }
}

export default ShelfNavigator;
